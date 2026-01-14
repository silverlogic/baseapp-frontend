'use client'

import { useState } from 'react'

import { setFormApiErrors } from '@baseapp-frontend/utils'
import { ACCESS_KEY_NAME, REFRESH_KEY_NAME } from '@baseapp-frontend/utils/constants/jwt'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import AllAuthApi from '../../../../services/allauth'
import type { AllAuthLoginJWTResponse } from '../../../../types/allauth'
import type { LoginMfaRequest } from '../../../../types/auth'
import {
  isLoginChangeExpiredPasswordRedirectResponse,
  isLoginMfaResponse,
} from '../../../../utils/login'
import { CODE_VALIDATION_INITIAL_VALUES, CODE_VALIDATION_SCHEMA } from '../../../mfa/constants'
import { LOGIN_INITIAL_VALUES, LOGIN_VALIDATION_SCHEMA } from '../constants'
import type { UseAllAuthLoginOptions } from '../types'
import { useAllAuthSession } from '../useAllAuthSession'

const useAllAuthLogin = ({
  loginFormOptions = {},
  loginOptions = {},
  mfaOptions = {},
  accessKeyName = ACCESS_KEY_NAME,
  refreshKeyName = REFRESH_KEY_NAME,
  enableFormApiErrors = true,
}: UseAllAuthLoginOptions = {}) => {
  const [mfaEphemeralToken, setMfaEphemeralToken] = useState<string | null>(null)
  const { startSession } = useAllAuthSession({ accessKeyName, refreshKeyName })

  const form = useForm<{ email: string; password: string }>({
    defaultValues: LOGIN_INITIAL_VALUES,
    resolver: zodResolver(LOGIN_VALIDATION_SCHEMA),
    mode: 'onChange',
    ...loginFormOptions,
  })

  const mutation = useMutation({
    mutationFn: (data: { email: string; password: string }) => AllAuthApi.login(data),
    ...loginOptions,
    onError: (err, variables, context) => {
      loginOptions?.onError?.(err, variables, context)
      if (enableFormApiErrors) {
        setFormApiErrors(form, err)
      }
    },
    onSuccess: async (response, variables, context) => {
      if (isLoginMfaResponse(response)) {
        setMfaEphemeralToken(response.ephemeralToken)
      } else if (!isLoginChangeExpiredPasswordRedirectResponse(response)) {
        const jwtResponse = response as AllAuthLoginJWTResponse
        const sessionData = {
          accessToken: jwtResponse.accessToken,
          refreshToken: jwtResponse.refreshToken,
          rawData: 'rawData' in response ? response.rawData : undefined,
        }
        await startSession(sessionData)
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
    mutationFn: (data: LoginMfaRequest) => AllAuthApi.loginStep2(data),
    ...mfaOptions,
    onError: (err, variables, context) => {
      mfaOptions?.onError?.(err, variables, context)
      if (enableFormApiErrors) {
        setFormApiErrors(form, err)
      }
    },
    onSuccess: async (response, variables, context) => {
      if (
        !isLoginMfaResponse(response) &&
        !isLoginChangeExpiredPasswordRedirectResponse(response)
      ) {
        const jwtResponse = response as AllAuthLoginJWTResponse
        const sessionData = {
          accessToken: jwtResponse.accessToken,
          refreshToken: jwtResponse.refreshToken,
          rawData: 'rawData' in response ? response.rawData : undefined,
        }
        await startSession(sessionData)
      }

      mfaOptions?.onSuccess?.(response, variables, context)
    },
  })

  return {
    form: {
      ...form,
      handleSubmit: form.handleSubmit(async (values) => {
        try {
          await mutation.mutateAsync(values)
        } catch (error) {
          // Error is already handled by mutation's onError callback
        }
      }),
    },
    mutation,
    mfaForm: {
      ...mfaForm,
      handleSubmit: mfaForm.handleSubmit(async (values) => {
        try {
          const newValues = { token: values.code, ephemeralToken: mfaEphemeralToken || '' }
          await mfaMutation.mutateAsync(newValues)
        } catch (error) {
          // Error is already handled by mutation's onError callback
        }
      }),
    },
    mfaMutation,
  }
}

export default useAllAuthLogin
