'use client'

import { setFormApiErrors } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { type SubmitHandler, useForm } from 'react-hook-form'

import AllAuthApi from '../../../../services/allauth'
import type { RegisterRequest } from '../../../../types/auth'
import {
  SIGNUP_INITIAL_VALUES,
  SIGNUP_VALIDATION_SCHEMA,
  SIGNUP_VALIDATION_SCHEMA_WITH_NAME,
} from '../constants'
import type { UseAllAuthSignUpOptions } from '../types'
import { normalizeAllAuthError } from '../utils'

const useAllAuthSignUp = <
  TRegisterRequest extends RegisterRequest = RegisterRequest,
  TRegisterResponse = void,
>({
  formOptions = {},
  defaultValues,
  enableFormApiErrors = true,
  mutationOptions = {},
  useNameField = false,
}: UseAllAuthSignUpOptions<TRegisterRequest, TRegisterResponse> = {}) => {
  const form = useForm<Partial<TRegisterRequest>>({
    defaultValues: (defaultValues ?? SIGNUP_INITIAL_VALUES) as any,
    resolver: zodResolver(
      (useNameField ? SIGNUP_VALIDATION_SCHEMA_WITH_NAME : SIGNUP_VALIDATION_SCHEMA) as any,
    ) as any,
    mode: 'onChange',
    ...formOptions,
  })

  const mutation = useMutation({
    mutationFn: (values) => AllAuthApi.register<TRegisterResponse>(values),
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

  const handleSubmit: SubmitHandler<TRegisterRequest> = async (values) => {
    try {
      await mutation.mutateAsync(values)
    } catch (error) {
      // Error is already handled by mutation's onError callback
    }
  }

  return {
    form: {
      ...form,
      handleSubmit: form.handleSubmit(handleSubmit as () => void) as any,
    },
    mutation,
  }
}

export default useAllAuthSignUp
