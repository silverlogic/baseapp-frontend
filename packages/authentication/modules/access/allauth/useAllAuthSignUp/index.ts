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

const useAllAuthSignUp = <
  TRegisterRequest extends RegisterRequest = RegisterRequest,
  TRegisterResponse = void,
>({
  formOptions = {},
  defaultValues,
  enableFormApiErrors = true,
  options = {},
  useNameField = false,
}: UseAllAuthSignUpOptions<TRegisterRequest, TRegisterResponse> = {}) => {
  const form = useForm<Partial<TRegisterRequest>>({
    defaultValues: (defaultValues || SIGNUP_INITIAL_VALUES) as any,
    resolver: zodResolver(
      (useNameField ? SIGNUP_VALIDATION_SCHEMA_WITH_NAME : SIGNUP_VALIDATION_SCHEMA) as any,
    ) as any,
    mode: 'onChange',
    ...formOptions,
  })

  const mutation = useMutation({
    mutationFn: (values) => AllAuthApi.register<TRegisterResponse>(values),
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

  const handleSubmit: SubmitHandler<TRegisterRequest> = async (values) => {
    try {
      await mutation.mutateAsync(values as TRegisterRequest)
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
