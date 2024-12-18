'use client'

import { setFormAllAuthApiErrors } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import AllAuthApi from '../../../services/allAuth'
import * as AllAuthTypes from '../../../types/allAuth'
import { DEFAULT_INITIAL_VALUES, DEFAULT_VALIDATION_SCHEMA } from './constants'
import type { UseAllAuthRecoveryCodeReauthenticate } from './types'

const useAllAuthRecoveryCodeReauthenticate = ({
  formOptions = {},
  mutationOptions = {},
  enableFormApiErrors = true,
}: UseAllAuthRecoveryCodeReauthenticate) => {
  const form = useForm({
    defaultValues: DEFAULT_INITIAL_VALUES,
    resolver: zodResolver(DEFAULT_VALIDATION_SCHEMA),
    mode: 'onChange',
    ...formOptions,
  })

  const mutation = useMutation({
    mutationFn: (data: AllAuthTypes.RecoveryCodeReauthenticateRequest) =>
      AllAuthApi.mfaReauthenticate(data),
    ...mutationOptions, // needs to be placed below all overridable options
    onError: (err, variables, context) => {
      mutationOptions?.onError?.(err, variables, context)
      if (enableFormApiErrors) {
        setFormAllAuthApiErrors(form, err)
      }
    },
    onSuccess: async (response, variables, context) => {
      mutationOptions?.onSuccess?.(response, variables, context)
    },
  })

  return {
    form: {
      ...form,
      handleSubmit: form.handleSubmit(async (values) => {
        await mutation.mutateAsync(values as AllAuthTypes.RecoveryCodeReauthenticateRequest)
      }) as any,
    },
    mutation,
  }
}

export default useAllAuthRecoveryCodeReauthenticate
