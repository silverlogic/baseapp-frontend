'use client'

import { setFormApiErrors } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import MfaApi, { MFA_API_KEY } from '../../../services/mfa'
import { CODE_VALIDATION_INITIAL_VALUES, CODE_VALIDATION_SCHEMA } from '../constants'
import type { UseMfaActivateConfirmOptions } from './types'

const useMfaActivateConfirm = ({
  method,
  validationSchema = CODE_VALIDATION_SCHEMA,
  defaultValues = CODE_VALIDATION_INITIAL_VALUES,
  ApiClass = MfaApi,
  enableFormApiErrors = true,
  options = {},
}: UseMfaActivateConfirmOptions) => {
  const form = useForm({
    defaultValues,
    resolver: zodResolver(validationSchema),
  })
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (data) => ApiClass.confirmActivation(data),
    ...options, // needs to be placed below all overridable options
    onError: (err, variables, context) => {
      options?.onError?.(err, variables, context)
      if (enableFormApiErrors) {
        setFormApiErrors(form, err)
      }
    },
    onSuccess: (response, variables, context) => {
      options?.onSuccess?.(response, variables, context)
      queryClient.invalidateQueries({ queryKey: MFA_API_KEY.getActiveMethods() })
    },
  })

  return {
    form: {
      ...form,
      // TODO: refactor types
      handleSubmit: form.handleSubmit(async (values: any) => {
        try {
          const newValues = { ...values, method }
          await mutation.mutateAsync(newValues)
        } catch (error) {
          // mutateAsync will raise an error if there's an API error
        }
        // TODO: refactor types
      }) as any,
    },
    mutation,
  }
}

export default useMfaActivateConfirm
