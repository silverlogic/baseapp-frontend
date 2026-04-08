'use client'

import { useMemo } from 'react'

import { setFormApiErrors } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { type SubmitHandler, useForm } from 'react-hook-form'

import type { RegisterRequest } from '../../../types/auth'
import { getActiveAuthModule } from '../../auth-strategy/factory'
import type { AuthError, AuthResult } from '../../auth-strategy/types'
import {
  DEFAULT_INITIAL_VALUES,
  DEFAULT_VALIDATION_SCHEMA,
  DEFAULT_VALIDATION_SCHEMA_WITH_NAME,
} from './constants'
import type { UseSignUpOptions } from './types'

const useSignUp = <TRegisterRequest extends RegisterRequest>({
  formOptions = {},
  enableFormApiErrors = true,
  options = {},
  useNameField = false,
}: UseSignUpOptions<TRegisterRequest> = {}) => {
  const strategy = useMemo(() => getActiveAuthModule().strategy, [])

  const form = useForm({
    // @ts-expect-error TODO: DeepPartial type error will be fixed on v8
    defaultValues: DEFAULT_INITIAL_VALUES,
    // @ts-expect-error TODO: Fix typing for zodResolver
    resolver: zodResolver(
      // @ts-expect-error TODO: Fix typing for zodResolver
      useNameField ? DEFAULT_VALIDATION_SCHEMA_WITH_NAME : DEFAULT_VALIDATION_SCHEMA,
    ),
    mode: 'onChange',
    ...formOptions,
  })

  const mutation = useMutation<AuthResult, AuthError | Error, TRegisterRequest>({
    mutationFn: (values) => strategy.signUp(values),
    ...options,
    onError: (error: unknown, variables, context) => {
      const err = error as AuthError | Error
      options?.onError?.(err, variables, context)
      if (enableFormApiErrors) {
        const errorWithFieldErrors =
          err && typeof err === 'object' && 'fieldErrors' in err
            ? { response: { data: (err as AuthError).fieldErrors } }
            : err
        setFormApiErrors(form, errorWithFieldErrors)
      }
    },
    onSuccess: (result, variables, context) => {
      options?.onSuccess?.(result, variables, context)
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
