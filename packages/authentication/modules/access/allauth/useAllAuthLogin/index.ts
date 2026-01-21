'use client'

import { setFormApiErrors } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import AllAuthApi from '../../../../services/allauth'
import type { AllAuthLoginResponse } from '../../../../types/allauth'
import { LOGIN_INITIAL_VALUES, LOGIN_VALIDATION_SCHEMA } from '../constants'
import type { UseAllAuthLoginOptions } from '../types'
import { useAllAuthSession } from '../useAllAuthSession'
import {
  extractTokensFromAllAuthResponse,
  isAllAuthPasswordChangeRedirect,
} from '../utils'

const useAllAuthLogin = ({
  loginFormOptions = {},
  loginOptions = {},
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
    ...loginOptions,
    onError: (err, variables, context) => {
      loginOptions?.onError?.(err, variables, context)
      if (enableFormApiErrors) {
        setFormApiErrors(form, err)
      }
    },
    onSuccess: async (response: AllAuthLoginResponse, variables, context) => {
      if (!isAllAuthPasswordChangeRedirect(response)) {
        const tokens = extractTokensFromAllAuthResponse(response)
        if (tokens) {
          await startSession({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            rawResponse: response,
          })
        }
      }

      loginOptions?.onSuccess?.(response, variables, context)
    },
  })

  // TODO: Add MFA support

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
  }
}

export default useAllAuthLogin
