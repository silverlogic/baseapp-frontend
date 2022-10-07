import { IAuthHookProps, IResetPassword } from './types'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { setFormApiErrors } from '../form/utils'
import { axios, useMutation } from '../api'

export const resetPasswordValidationSchema = Yup.object().shape({
  newPassword: Yup.string().required('This field is required'),
  token: Yup.string().required('This field is required'),
})

const defaultInitialValues = {
  newPassword: '',
  token: '',
}

export function useResetPassword({
  validationSchema = resetPasswordValidationSchema,
  defaultValues = defaultInitialValues,
  onError,
  onSuccess,
}: IAuthHookProps): IResetPassword {
  const mutation = useMutation(
    (data) => {
      return axios.post('/forgot-password/reset', data)
    },
    {
      onError: (err: any, variables, context) => {
        onError?.(err, variables, context)
        setFormApiErrors(form, err) // this is important to show backend errors on each specific field
      },
      onSuccess: (response: any, variables, context) => {
        onSuccess?.(response, variables, context)
      },
    },
  )

  const form = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  })

  return {
    form: {
      ...form,
      handleSubmit: form.handleSubmit(async (values: any) => {
        try {
          await mutation.mutateAsync(values)
        } catch (error) {
          // mutateAsync will raise an error if there's an API error
        }
      }),
    },
    mutation,
  }
}
