import { setFormApiErrors } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'

import AuthApi from '../../../services/auth'
import { DEFAULT_INITIAL_VALUES, DEFAULT_VALIDATION_SCHEMA } from './constants'
import { ChangeExpiredPasswordForm, UseChangeExpiredPassword } from './types'

const useChangeExpiredPassword = ({
  token,
  validationSchema = DEFAULT_VALIDATION_SCHEMA,
  defaultValues = DEFAULT_INITIAL_VALUES,
  ApiClass = AuthApi,
  enableFormApiErrors = true,
  options = {},
}: UseChangeExpiredPassword) => {
  const form = useForm({
    defaultValues,
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
  })

  const mutation = useMutation({
    mutationFn: ({ currentPassword, newPassword }) =>
      ApiClass.changeExpiredPassword({ currentPassword, newPassword, token }),
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

  const handleSubmit: SubmitHandler<ChangeExpiredPasswordForm> = async (values) => {
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

export default useChangeExpiredPassword
