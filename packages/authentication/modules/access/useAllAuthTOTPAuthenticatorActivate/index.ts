'use client'

import { setFormAllAuthApiErrors } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import AllAuthApi from '../../../services/allAuth'
import * as AllAuthTypes from '../../../types/allAuth'
import { DEFAULT_INITIAL_VALUES, DEFAULT_VALIDATION_SCHEMA } from './constants'
import type { UseAllAuthTOTPAuthenticatorActivate } from './types'

const useAllAuthTOTPAuthenticatorActivate = ({
  formOptions = {},
  mutationOptions = {},
  enableFormApiErrors = true,
}: UseAllAuthTOTPAuthenticatorActivate) => {
  const queryClient = useQueryClient()

  const form = useForm({
    defaultValues: DEFAULT_INITIAL_VALUES,
    resolver: zodResolver(DEFAULT_VALIDATION_SCHEMA),
    mode: 'onChange',
    ...formOptions,
  })

  const mutation = useMutation({
    mutationFn: (data: AllAuthTypes.ActivateTOTPAuthenticatorRequest) =>
      AllAuthApi.activateTOTPAuthenticator(data),
    ...mutationOptions, // needs to be placed below all overridable options
    onError: (err, variables, context) => {
      mutationOptions?.onError?.(err, variables, context)
      if (enableFormApiErrors) {
        setFormAllAuthApiErrors(form, err)
      }
    },
    onSuccess: async (response, variables, context) => {
      mutationOptions?.onSuccess?.(response, variables, context)
      queryClient.invalidateQueries({ queryKey: AllAuthApi.QUERY_KEYS.getTOTPAuthenticator() })
    },
  })

  return {
    form: {
      ...form,
      handleSubmit: form.handleSubmit(async (values) => {
        await mutation.mutateAsync(values as AllAuthTypes.ActivateTOTPAuthenticatorRequest)
      }) as any,
    },
    mutation,
  }
}

export default useAllAuthTOTPAuthenticatorActivate
