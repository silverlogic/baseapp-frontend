'use client'

import {
  ACCESS_KEY_NAME,
  REFRESH_KEY_NAME,
  setFormAllAuthApiErrors,
  setTokenAsync,
} from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import AllAuthApi from '../../../services/allAuth'
import * as AllAuthTypes from '../../../types/allAuth'
import { DEFAULT_INITIAL_VALUES, DEFAULT_VALIDATION_SCHEMA } from './constants'
import type { UseAllAuthRecoveryCodeAuthenticate } from './types'

const useAllAuthRecoveryCodeAuthenticate = ({
  formOptions = {},
  mutationOptions = {},
  accessKeyName = ACCESS_KEY_NAME,
  refreshKeyName = REFRESH_KEY_NAME,
  enableFormApiErrors = true,
}: UseAllAuthRecoveryCodeAuthenticate) => {
  /*
   * Handles login success  with the auth token in response
   */
  async function handleSuccess(sessionInfo: AllAuthTypes.SessionInfo) {
    if (sessionInfo.response.status === 200 && sessionInfo.response.data.meta.isAuthenticated) {
      const accessToken = sessionInfo.response.data.meta.accessToken!
      await setTokenAsync(accessKeyName, accessToken.access, {
        secure: process.env.NODE_ENV === 'production',
      })
      await setTokenAsync(refreshKeyName, accessToken.refresh, {
        secure: process.env.NODE_ENV === 'production',
      })
    }
  }

  const form = useForm({
    defaultValues: DEFAULT_INITIAL_VALUES,
    resolver: zodResolver(DEFAULT_VALIDATION_SCHEMA),
    mode: 'onChange',
    ...formOptions,
  })

  const mutation = useMutation({
    mutationFn: (data: AllAuthTypes.RecoveryCodeAuthenticateRequest) =>
      AllAuthApi.mfaAuthenticate(data),
    ...mutationOptions, // needs to be placed below all overridable options
    onError: (err, variables, context) => {
      mutationOptions?.onError?.(err, variables, context)
      if (enableFormApiErrors) {
        setFormAllAuthApiErrors(form, err)
      }
    },
    onSuccess: async (response, variables, context) => {
      handleSuccess(response)
      mutationOptions?.onSuccess?.(response, variables, context)
    },
  })

  return {
    form: {
      ...form,
      handleSubmit: form.handleSubmit(async (values) => {
        await mutation.mutateAsync(values as AllAuthTypes.TOTPAuthenticateRequest)
      }) as any,
    },
    mutation,
  }
}

export default useAllAuthRecoveryCodeAuthenticate
