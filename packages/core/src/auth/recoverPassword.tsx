import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import * as Yup from 'yup'

import { axios } from '../axios'
import { setFormApiErrors } from '../form/utils'
import { IAuthHookProps, IRecoverPassword } from './types'

export const recoverPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please provide a properly formatted email address')
    .required('This field is required'),
})

const defaultInitialValues = {
  email: '',
}

export function useRecoverPassword({
  validationSchema = recoverPasswordValidationSchema,
  defaultValues = defaultInitialValues,
  onError,
  onSuccess,
}: IAuthHookProps): IRecoverPassword {
  const form = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  })

  const mutation = useMutation((data) => axios.post('/forgot-password', data), {
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
