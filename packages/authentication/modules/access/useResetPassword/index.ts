'use client'

import { useMemo } from 'react'

import { setFormApiErrors } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { getActiveAuthModule } from '../../auth-strategy/factory'
import type { AuthError } from '../../auth-strategy/types'
import { DEFAULT_INITIAL_VALUES, DEFAULT_VALIDATION_SCHEMA } from './constants'
import type { ResetPasswordForm, UseResetPasswordOptions } from './types'

const useResetPassword = ({
  token,
  validationSchema = DEFAULT_VALIDATION_SCHEMA,
  defaultValues = DEFAULT_INITIAL_VALUES,
  enableFormApiErrors = true,
  options = {},
}: UseResetPasswordOptions) => {
  const strategy = useMemo(() => getActiveAuthModule().strategy, [])

  const form = useForm<ResetPasswordForm>({
    defaultValues,
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
  })

  const mutation = useMutation({
    mutationFn: ({ newPassword }: ResetPasswordForm) =>
      strategy.resetPassword({ newPassword, token }),
    ...options,
    onError: (err: AuthError | Error, variables, context) => {
      options?.onError?.(err as any, variables, context)
      if (enableFormApiErrors) {
        const errorWithFieldErrors =
          err && typeof err === 'object' && 'fieldErrors' in err
            ? { response: { data: err.fieldErrors } }
            : err
        setFormApiErrors(form, errorWithFieldErrors)
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

export default useResetPassword
