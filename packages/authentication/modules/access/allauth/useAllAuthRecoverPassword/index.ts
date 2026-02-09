'use client'

import { setFormApiErrors } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { type SubmitHandler, useForm } from 'react-hook-form'

import AllAuthApi from '../../../../services/allauth'
import type { ForgotPasswordRequest } from '../../../../types/auth'
import { RECOVER_PASSWORD_INITIAL_VALUES, RECOVER_PASSWORD_VALIDATION_SCHEMA } from '../constants'
import type { UseAllAuthRecoverPasswordOptions } from '../types'
import { normalizeAllAuthError } from '../utils'

const useAllAuthRecoverPassword = ({
  validationSchema = RECOVER_PASSWORD_VALIDATION_SCHEMA,
  defaultValues = RECOVER_PASSWORD_INITIAL_VALUES,
  enableFormApiErrors = true,
  mutationOptions = {},
}: UseAllAuthRecoverPasswordOptions = {}) => {
  const form = useForm<ForgotPasswordRequest>({
    defaultValues,
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
  })

  const mutation = useMutation({
    mutationFn: ({ email }) => AllAuthApi.recoverPassword({ email }),
    ...mutationOptions,
    onError: (err, variables, context) => {
      const normalizedError = normalizeAllAuthError(err)
      mutationOptions?.onError?.(normalizedError, variables, context)
      if (enableFormApiErrors) {
        setFormApiErrors(form, normalizedError)
      }
    },
    onSuccess: (response, variables, context) => {
      mutationOptions?.onSuccess?.(response, variables, context)
    },
  })

  const handleSubmit: SubmitHandler<ForgotPasswordRequest> = async (values) => {
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

export default useAllAuthRecoverPassword
