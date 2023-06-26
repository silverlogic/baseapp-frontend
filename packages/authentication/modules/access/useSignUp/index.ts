import { setFormApiErrors } from '@baseapp-frontend/utils'

import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'

import AuthApi from '../../../services/auth'
import { IRegisterRequest } from '../../../types/auth'
import { DEFAULT_INITIAL_VALUES, DEFAULT_VALIDATION_SCHEMA } from './constants'
import { IUseSignUp } from './types'

const useSignUp = <TRegisterRequest extends IRegisterRequest, TRegisterResponse = void>({
  validationSchema = DEFAULT_VALIDATION_SCHEMA,
  defaultValues = DEFAULT_INITIAL_VALUES as TRegisterRequest,
  options,
}: IUseSignUp<TRegisterRequest, TRegisterResponse>) => {
  const form = useForm({
    // @ts-ignore TODO: DeepPartial type error will be fixed on v8
    defaultValues,
    resolver: yupResolver(validationSchema),
  })

  const mutation = useMutation({
    mutationFn: (values) => AuthApi.register<TRegisterResponse>(values),
    ...options, // needs to be placed bellow all overridable options
    onError: (err, variables, context) => {
      options?.onError?.(err, variables, context)
      setFormApiErrors(form, err) // this is important to show backend errors on each specific field
    },
    onSuccess: (response, variables, context) => {
      options?.onSuccess?.(response, variables, context)
    },
  })

  const handleSubmit: SubmitHandler<TRegisterRequest> = async (values) => {
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

export default useSignUp
