'use client'

import { useMemo } from 'react'

import { setFormApiErrors } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { getActiveAuthModule } from '../../auth-strategy/factory'
import type { AuthError } from '../../auth-strategy/types'
import { DEFAULT_INITIAL_VALUES, DEFAULT_VALIDATION_SCHEMA } from './constants'
import type { ChangePasswordForm, UseChangePassword } from './types'

const useChangePassword = ({
  token,
  validationSchema = DEFAULT_VALIDATION_SCHEMA,
  defaultValues = DEFAULT_INITIAL_VALUES,
  enableFormApiErrors = true,
  options = {},
}: UseChangePassword) => {
  const strategy = useMemo(() => getActiveAuthModule().strategy, [])

  const form = useForm<ChangePasswordForm>({
    defaultValues,
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
  })

  const mutation = useMutation({
    mutationFn: ({ currentPassword, newPassword }: ChangePasswordForm) =>
      strategy.changePassword({ currentPassword, newPassword, token }),
    ...options,
    onError: (err: AuthError | Error, variables, context) => {
      options?.onError?.(err, variables, context)
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

  const handleSubmit: SubmitHandler<ChangePasswordForm> = async (values) => {
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

export default useChangePassword
