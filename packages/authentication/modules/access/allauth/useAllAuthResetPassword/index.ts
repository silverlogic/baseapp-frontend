'use client'

import { setFormApiErrors } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { type SubmitHandler, useForm } from 'react-hook-form'

import AllAuthApi from '../../../../services/allauth'
import { RESET_PASSWORD_INITIAL_VALUES, RESET_PASSWORD_VALIDATION_SCHEMA } from '../constants'
import type { ResetPasswordForm, UseAllAuthResetPasswordOptions } from '../types'

const useAllAuthResetPassword = ({
  token,
  validationSchema = RESET_PASSWORD_VALIDATION_SCHEMA,
  defaultValues = RESET_PASSWORD_INITIAL_VALUES,
  enableFormApiErrors = true,
  options = {},
}: UseAllAuthResetPasswordOptions) => {
  const form = useForm<ResetPasswordForm>({
    defaultValues,
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
  })

  const mutation = useMutation({
    mutationFn: ({ newPassword }) => AllAuthApi.resetPassword({ newPassword, token }),
    ...options,
    onError: (err, variables, context) => {
      options?.onError?.(err, variables, context)
      if (enableFormApiErrors) {
        setFormApiErrors(form, err)
      }
    },
    onSuccess: (response, variables, context) => {
      options?.onSuccess?.(response, variables, context)
    },
  })

  const handleSubmit: SubmitHandler<ResetPasswordForm> = async (values) => {
    try {
      await mutation.mutateAsync(values)
    } catch (error) {
      // mutateAsync will raise an error if there's an API error
    }
  }

  return {
    form: {
      ...form,
      handleSubmit: form.handleSubmit(handleSubmit),
    },
    mutation,
  }
}

export default useAllAuthResetPassword
