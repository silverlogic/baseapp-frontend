import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import * as Yup from 'yup'

import { axios } from '../axios'
import { setFormApiErrors } from '../form/utils'
import { IAuthHookProps, IResetPassword } from './types'

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
  const form = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  })

  const mutation = useMutation((data) => axios.post('/forgot-password/reset', data), {
    onError: (err: any, variables, context) => {
      onError?.(err, variables, context)
      setFormApiErrors(form, err) // this is important to show backend errors on each specific field
    },
    onSuccess: (response: any, variables, context) => {
      onSuccess?.(response, variables, context)
    },
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
