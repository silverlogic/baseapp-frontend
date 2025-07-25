'use client'

import { useState } from 'react'

import {
  ACCESS_KEY_NAME,
  REFRESH_KEY_NAME,
  decodeJWT,
  setFormApiErrors,
  setTokenAsync,
} from '@baseapp-frontend/utils'
import { isMobilePlatform } from '@baseapp-frontend/utils/functions/os'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import AuthApi from '../../../services/auth'
import MfaApi from '../../../services/mfa'
import type {
  LoginChangeExpiredPasswordRedirectResponse,
  LoginJWTResponse,
  LoginMfaRequest,
} from '../../../types/auth'
import { User } from '../../../types/user'
import {
  isLoginChangeExpiredPasswordRedirectResponse,
  isLoginMfaResponse,
} from '../../../utils/login'
import { CODE_VALIDATION_INITIAL_VALUES, CODE_VALIDATION_SCHEMA } from '../../mfa/constants'
import { useCurrentProfile } from '../../profile'
import { setProfileExpoStorage } from '../../profile/utils'
import { DEFAULT_INITIAL_VALUES, DEFAULT_VALIDATION_SCHEMA } from './constants'
import type { ApiClass, LoginParams, UseLoginOptions } from './types'

const useLogin = <TApiClass extends ApiClass = typeof AuthApi>({
  loginFormOptions = {},
  loginOptions = {},
  mfaOptions = {},
  accessKeyName = ACCESS_KEY_NAME,
  refreshKeyName = REFRESH_KEY_NAME,
  ApiClass = AuthApi as unknown as TApiClass,
  enableFormApiErrors = true,
}: UseLoginOptions<TApiClass> = {}) => {
  const [mfaEphemeralToken, setMfaEphemeralToken] = useState<string | null>(null)
  const { setCurrentProfile } = useCurrentProfile()

  /*
   * Handles login success  with the auth token in response
   */
  async function handleLoginSuccess(
    response: LoginJWTResponse | LoginChangeExpiredPasswordRedirectResponse,
  ) {
    if (isLoginChangeExpiredPasswordRedirectResponse(response)) {
      return
    }

    const isWebPlatform = !isMobilePlatform()

    const user = decodeJWT<User>(response.access)
    if (user) {
      const API_BASE_URL = isWebPlatform
        ? process.env.NEXT_PUBLIC_API_BASE_URL
        : process.env.EXPO_PUBLIC_API_BASE_URL
      const baseUrl = API_BASE_URL?.replace('/v1', '')
      let absoluteImagePath = null
      if (user?.profile?.image) {
        absoluteImagePath = user.profile.image.startsWith('http')
          ? user.profile.image
          : `${baseUrl}${user.profile.image}`
      }

      const currentProfile = {
        ...user.profile,
        image: absoluteImagePath,
      }

      setCurrentProfile(currentProfile)
      await setProfileExpoStorage(currentProfile)
    }

    await setTokenAsync(accessKeyName, response.access, {
      secure: process.env.NODE_ENV === 'production',
    })
    await setTokenAsync(refreshKeyName, response.refresh, {
      secure: process.env.NODE_ENV === 'production',
    })
  }

  const form = useForm<LoginParams<TApiClass>>({
    defaultValues: DEFAULT_INITIAL_VALUES as LoginParams<TApiClass>,
    resolver: zodResolver(DEFAULT_VALIDATION_SCHEMA),
    mode: 'onChange',
    ...loginFormOptions,
  })

  const mutation = useMutation({
    mutationFn: (data: LoginParams<TApiClass>) => ApiClass.login(data),
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
        await handleLoginSuccess(response)
      }
      // onSuccess should only run after we successfully await the handleLoginSuccess (that sets the auth tokens asynchonously)
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
    onSuccess: async (response, variables, context) => {
      if (!isLoginMfaResponse(response)) {
        await handleLoginSuccess(response)
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
          // mutateAsync will raise an error if there's an API error
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
          // mutateAsync will raise an error if there's an API error
        }
      }),
    },
    mfaMutation,
  }
}

export default useLogin
