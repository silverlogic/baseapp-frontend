import { setFormApiErrors } from '@baseapp-frontend/utils'

import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'

import AuthApi from '../../../services/auth'
import { DEFAULT_INITIAL_VALUES, DEFAULT_VALIDATION_SCHEMA } from './constants'
import { IUseResetPassword, ResetPasswordForm } from './types'

const useResetPassword = ({
  token,
  validationSchema = DEFAULT_VALIDATION_SCHEMA,
  defaultValues = DEFAULT_INITIAL_VALUES,
  ApiClass = AuthApi,
  options,
}: IUseResetPassword) => {
  const form = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  })

  const mutation = useMutation({
    mutationFn: ({ newPassword }) => ApiClass.resetPassword({ newPassword, token }),
    ...options, // needs to be placed bellow all overridable options
    onError: (err, variables, context) => {
      options?.onError?.(err, variables, context)
      setFormApiErrors(form, err) // this is important to show backend errors on each specific field
    },
    onSuccess: (response, variables, context) => {
      options?.onSuccess?.(response, variables, context)
    },
  })

  const handleSubmit: SubmitHandler<ResetPasswordForm> = async (values) => {
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

export default useResetPassword
