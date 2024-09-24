'use client'

import { setFormApiErrors } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'

import AuthApi from '../../../services/auth'
import { RegisterRequest } from '../../../types/auth'
import { DEFAULT_INITIAL_VALUES, DEFAULT_VALIDATION_SCHEMA } from './constants'
import { UseSignUpOptions } from './types'

const useSignUp = <TRegisterRequest extends RegisterRequest, TRegisterResponse = void>({
  formOptions = {},
  ApiClass = AuthApi,
  enableFormApiErrors = true,
  options = {},
}: UseSignUpOptions<TRegisterRequest, TRegisterResponse> = {}) => {
  const form = useForm({
    // @ts-ignore TODO: DeepPartial type error will be fixed on v8
    defaultValues: DEFAULT_INITIAL_VALUES,
    resolver: zodResolver(DEFAULT_VALIDATION_SCHEMA),
    mode: 'onBlur',
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
      console.error(error)
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
