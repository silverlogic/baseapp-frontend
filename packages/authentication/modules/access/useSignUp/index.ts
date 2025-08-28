'use client'

import { setFormApiErrors } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { type SubmitHandler, useForm } from 'react-hook-form'

import AuthApi from '../../../services/auth'
import type { RegisterRequest } from '../../../types/auth'
import {
  DEFAULT_INITIAL_VALUES,
  DEFAULT_VALIDATION_SCHEMA,
  DEFAULT_VALIDATION_SCHEMA_WITH_NAME,
} from './constants'
import type { UseSignUpOptions } from './types'

const useSignUp = <TRegisterRequest extends RegisterRequest, TRegisterResponse = void>({
  formOptions = {},
  ApiClass = AuthApi,
  enableFormApiErrors = true,
  options = {},
  useNameField = false,
}: UseSignUpOptions<TRegisterRequest, TRegisterResponse> = {}) => {
  const form = useForm({
    // @ts-ignore TODO: DeepPartial type error will be fixed on v8
    defaultValues: DEFAULT_INITIAL_VALUES,
    // @ts-ignore TODO: Fix typing for zodResolver
    resolver: zodResolver(
      // @ts-ignore TODO: Fix typing for zodResolver
      useNameField ? DEFAULT_VALIDATION_SCHEMA_WITH_NAME : DEFAULT_VALIDATION_SCHEMA,
    ),
    mode: 'onChange',
    ...formOptions,
  })

  const mutation = useMutation({
    mutationFn: (values) => ApiClass.register<TRegisterResponse>(values),
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

  const handleSubmit: SubmitHandler<TRegisterRequest> = async (values) => {
    try {
      await mutation.mutateAsync(values)
    } catch (error) {
      // handled by onError
    }
  }

  return {
    form: {
      ...form,
      // TODO: improve types
      handleSubmit: form.handleSubmit(handleSubmit as () => void) as any,
    },
    mutation,
  }
}

export default useSignUp
