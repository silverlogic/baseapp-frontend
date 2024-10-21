'use client'

import { setFormApiErrors } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { type SubmitHandler, useForm } from 'react-hook-form'

import AuthApi from '../../../services/auth'
import type { ForgotPasswordRequest } from '../../../types/auth'
import { DEFAULT_INITIAL_VALUES, DEFAULT_VALIDATION_SCHEMA } from './constants'
import type { UseRecoverPasswordOptions } from './types'

const useRecoverPassword = ({
  validationSchema = DEFAULT_VALIDATION_SCHEMA,
  defaultValues = DEFAULT_INITIAL_VALUES,
  ApiClass = AuthApi,
  enableFormApiErrors = true,
  options = {},
}: UseRecoverPasswordOptions = {}) => {
  const form = useForm({
    defaultValues,
    resolver: zodResolver(validationSchema),
    mode: 'onBlur',
  })

  const mutation = useMutation({
    mutationFn: ({ email }) => ApiClass.recoverPassword({ email }),
    ...options, // needs to be placed below all overridable options
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
      // TODO: improve types
      handleSubmit: form.handleSubmit(handleSubmit) as any,
    },
    mutation,
  }
}

export default useRecoverPassword
