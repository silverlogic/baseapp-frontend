'use client'

import type React from 'react'

import { setFormApiErrors } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import AllAuthApi from '../../../../services/allauth'
import type { AllAuthLoginResponse } from '../../../../types/allauth'
import { LOGIN_INITIAL_VALUES, LOGIN_VALIDATION_SCHEMA } from '../constants'
import type { UseAllAuthLoginOptions } from '../types'
import { useAllAuthSession } from '../useAllAuthSession'
import { isAllAuthPasswordChangeRedirect, normalizeAllAuthError } from '../utils'

const useAllAuthLogin = ({
  loginFormOptions = {},
  mutationOptions = {},
  enableFormApiErrors = true,
}: UseAllAuthLoginOptions = {}) => {
  const { startSession } = useAllAuthSession()

  const form = useForm<{ email: string; password: string }>({
    defaultValues: LOGIN_INITIAL_VALUES,
    resolver: zodResolver(LOGIN_VALIDATION_SCHEMA),
    mode: 'onChange',
    ...loginFormOptions,
  })

  const mutation = useMutation({
    mutationFn: (data: { email: string; password: string }) => AllAuthApi.login(data),
    ...mutationOptions,
    onError: (err, variables, context) => {
      const normalizedError = normalizeAllAuthError(err)
      mutationOptions?.onError?.(normalizedError, variables, context)
      if (enableFormApiErrors) {
        setFormApiErrors(form, normalizedError)
      }
    },
    onSuccess: async (response: AllAuthLoginResponse, variables, context) => {
      if (!isAllAuthPasswordChangeRedirect(response)) {
        await startSession({
          accessToken: response.meta.accessToken,
          refreshToken: response.meta.refreshToken,
          sessionToken: response.meta.sessionToken,
          rawResponse: response,
        })
      }

      mutationOptions?.onSuccess?.(response, variables, context)
    },
  })

  // TODO: implement MFA support in a separate story
  const mfaForm = {
    handleSubmit: (e?: React.BaseSyntheticEvent) => {
      e?.preventDefault()
    },
    formState: { isSubmitting: false },
  }

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
    mfaForm,
  }
}

export default useAllAuthLogin
