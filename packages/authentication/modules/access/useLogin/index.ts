'use client'

import { useState } from 'react'

import {
  ACCESS_COOKIE_NAME,
  REFRESH_COOKIE_NAME,
  TokenTypes,
  setFormApiErrors,
} from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useForm } from 'react-hook-form'

import AuthApi from '../../../services/auth'
import MfaApi from '../../../services/mfa'
import { USER_API_KEY } from '../../../services/user'
import {
  LoginChangeExpiredPasswordRedirectResponse,
  LoginJWTResponse,
  LoginMfaRequest,
  LoginRequest,
  LoginSimpleTokenResponse,
} from '../../../types/auth'
import {
  isJWTResponse,
  isLoginChangeExpiredPasswordRedirectResponse,
  isLoginMfaResponse,
} from '../../../utils/login'
import { CODE_VALIDATION_INITIAL_VALUES, CODE_VALIDATION_SCHEMA } from '../../mfa/constants'
import { useSimpleTokenUser } from '../../user'
import { DEFAULT_INITIAL_VALUES, DEFAULT_VALIDATION_SCHEMA } from './constants'
import { UseLoginOptions } from './types'

const jwtSuccessHandler = (
  response: LoginJWTResponse,
  cookieName: string,
  refreshCookieName: string,
) => {
  Cookies.set(cookieName, response.access, {
    secure: process.env.NODE_ENV === 'production',
  })
  Cookies.set(refreshCookieName, response.refresh, {
    secure: process.env.NODE_ENV === 'production',
  })
}

const simpleTokenSuccessHandler = (
  response: LoginSimpleTokenResponse,
  cookieName: string,
  onSuccess: () => void,
) => {
  Cookies.set(cookieName, response.token, {
    secure: process.env.NODE_ENV === 'production',
  })

  onSuccess()
}

const useLogin = ({
  validationSchema = DEFAULT_VALIDATION_SCHEMA,
  defaultValues = DEFAULT_INITIAL_VALUES,
  loginOptions = {},
  mfaOptions = {},
  tokenType = TokenTypes.jwt,
  cookieName = ACCESS_COOKIE_NAME,
  refreshCookieName = REFRESH_COOKIE_NAME,
  ApiClass = AuthApi,
  enableFormApiErrors = true,
}: UseLoginOptions = {}) => {
  const queryClient = useQueryClient()
  const [mfaEphemeralToken, setMfaEphemeralToken] = useState<string | null>(null)
  const { refetch: refetchUser } = useSimpleTokenUser({ options: { enabled: false } })

  /*
   * Handles login success  with the auth token in response
   */
  async function handleLoginSuccess(
    response:
      | LoginJWTResponse
      | LoginSimpleTokenResponse
      | LoginChangeExpiredPasswordRedirectResponse,
  ) {
    if (isLoginChangeExpiredPasswordRedirectResponse(response)) {
      return
    }
    if (isJWTResponse(tokenType, response)) {
      jwtSuccessHandler(response, cookieName, refreshCookieName)
    } else {
      simpleTokenSuccessHandler(response, cookieName, () => {
        // by invalidating the cache we force a reload of /v1/users/me and the state used by useUser hook
        queryClient.invalidateQueries({ queryKey: USER_API_KEY.getUser() })
        refetchUser()
      })
    }
  }

  const form = useForm({
    defaultValues,
    resolver: zodResolver(validationSchema),
    mode: 'onBlur',
  })

  const mutation = useMutation({
    mutationFn: (data: LoginRequest) => ApiClass.login(data),
    ...loginOptions, // needs to be placed bellow all overridable options
    onError: (err, variables, context) => {
      loginOptions?.onError?.(err, variables, context)
      if (enableFormApiErrors) {
        setFormApiErrors(form, err)
      }
    },
    onSuccess: async (response, variables, context) => {
      if (isLoginMfaResponse(response)) {
        setMfaEphemeralToken(response.ephemeralToken)
      } else {
        handleLoginSuccess(response)
      }
      loginOptions?.onSuccess?.(response, variables, context)
    },
  })

  const mfaForm = useForm({
    defaultValues: CODE_VALIDATION_INITIAL_VALUES,
    resolver: zodResolver(CODE_VALIDATION_SCHEMA),
    mode: 'onBlur',
  })

  const mfaMutation = useMutation({
    mutationFn: (data: LoginMfaRequest) => MfaApi.loginStep2(data),
    ...mfaOptions, // needs to be placed bellow all overridable options
    onError: (err, variables, context) => {
      mfaOptions?.onError?.(err, variables, context)
      if (enableFormApiErrors) {
        setFormApiErrors(form, err)
      }
    },
    onSuccess: (response, variables, context) => {
      // @ts-ignore BA-1206: fix typing
      handleLoginSuccess(response)
      mfaOptions?.onSuccess?.(response, variables, context)
    },
  })

  return {
    form: {
      ...form,
      // TODO: refactor types
      handleSubmit: form.handleSubmit(async (values) => {
        try {
          await mutation.mutateAsync(values)
        } catch (error) {
          // mutateAsync will raise an error if there's an API error
        }
        // TODO: refactor types
      }) as any,
    },
    mutation,
    mfaForm: {
      ...mfaForm,
      // TODO: refactor types
      handleSubmit: mfaForm.handleSubmit(async (values: any) => {
        try {
          const newValues = { ...values, ephemeralToken: mfaEphemeralToken }
          await mfaMutation.mutateAsync(newValues)
        } catch (error) {
          // mutateAsync will raise an error if there's an API error
        }
        // TODO: refactor types
      }) as any,
    },
    mfaMutation,
  }
}

export default useLogin
