'use client'

import { useMemo, useState } from 'react'

import { setFormApiErrors } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import MfaApi from '../../../services/mfa'
import type { LoginJWTResponse, LoginMfaRequest, LoginResponse } from '../../../types/auth'
import { getActiveAuthModule } from '../../auth-strategy/factory'
import type { AuthError, AuthResult } from '../../auth-strategy/types'
import { CODE_VALIDATION_INITIAL_VALUES, CODE_VALIDATION_SCHEMA } from '../../mfa/constants'
import { useCurrentProfile } from '../../profile'
import { setProfileExpoStorage } from '../../profile/utils'
import { DEFAULT_INITIAL_VALUES, DEFAULT_VALIDATION_SCHEMA } from './constants'
import {
  resolveProfileFromAuthResult,
  writeMfaSession,
  writeSessionFromAuthResult,
} from './login-success-handler'
import type { ApiClass, LoginParams, UseLoginOptions } from './types'

const useLogin = <TApiClass extends ApiClass>({
  loginFormOptions = {},
  loginOptions = {},
  mfaOptions = {},
  enableFormApiErrors = true,
}: UseLoginOptions<TApiClass> = {}) => {
  const [mfaEphemeralToken, setMfaEphemeralToken] = useState<string | null>(null)
  const { setCurrentProfile } = useCurrentProfile()
  const strategy = useMemo(() => getActiveAuthModule().strategy, [])

  async function handleLoginSuccess(result: AuthResult) {
    await writeSessionFromAuthResult(result)
    const profile = resolveProfileFromAuthResult(result)
    if (profile) {
      setCurrentProfile(profile)
      await setProfileExpoStorage(profile)
    }
  }

  const form = useForm<LoginParams<TApiClass>>({
    defaultValues: DEFAULT_INITIAL_VALUES as LoginParams<TApiClass>,
    resolver: zodResolver(DEFAULT_VALIDATION_SCHEMA),
    mode: 'onChange',
    ...loginFormOptions,
  })

  const mutation = useMutation<AuthResult, AuthError | Error, LoginParams<TApiClass>>({
    mutationFn: (data: LoginParams<TApiClass>) => strategy.login(data),
    ...loginOptions,
    onError: (error: unknown, variables, context) => {
      const err = error as AuthError | Error
      loginOptions?.onError?.(err, variables, context)
      if (enableFormApiErrors) {
        const errorWithFieldErrors =
          err && typeof err === 'object' && 'fieldErrors' in err
            ? { response: { data: err.fieldErrors } }
            : err
        setFormApiErrors(form, errorWithFieldErrors)
      }
    },
    onSuccess: async (result, variables, context) => {
      if (result.kind === 'mfa_required') {
        setMfaEphemeralToken(result.ephemeralToken)
      } else if (result.kind === 'success') {
        await handleLoginSuccess(result)
      }
      loginOptions?.onSuccess?.(result, variables, context)
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
      const isTokenResponse = (data: LoginResponse): data is LoginJWTResponse =>
        'access' in data && 'refresh' in data
      if (isTokenResponse(response)) {
        await writeMfaSession(response)
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
