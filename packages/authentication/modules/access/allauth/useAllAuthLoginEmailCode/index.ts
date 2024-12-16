'use client'

import { setFormAllAuthApiErrors } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import AllAuthApi from '../../../../services/allAuth'
import type * as AllAuthTypes from '../../../../types/allAuth'
import { DEFAULT_INITIAL_VALUES, DEFAULT_VALIDATION_SCHEMA } from './constants'
import type { UseAllAuthLoginEmailCode } from './types'

export const useAllAuthLoginEmailCode = ({
  formOptions = {},
  mutationOptions = {},
  enableFormApiErrors = true,
}: UseAllAuthLoginEmailCode) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  async function handleSuccess(sessionInfo: AllAuthTypes.SessionInfo) {}

  const form = useForm({
    defaultValues: DEFAULT_INITIAL_VALUES,
    resolver: zodResolver(DEFAULT_VALIDATION_SCHEMA),
    mode: 'onChange',
    ...formOptions,
  })

  const mutation = useMutation({
    mutationFn: (data: AllAuthTypes.RequestLoginEmailCodeRequest) =>
      AllAuthApi.requestLoginEmailCode(data),
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
        await mutation.mutateAsync(values as AllAuthTypes.RequestLoginEmailCodeRequest)
      }) as any,
    },
    mutation,
  }
}
