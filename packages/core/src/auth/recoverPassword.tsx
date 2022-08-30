import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { IRecoverPassword } from './types'
import { setFormApiErrors } from './utils'
import { axios, useMutation } from '../api'

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
}: {
  validationSchema?: any
  defaultValues?: any
  // eslint-disable-next-line @typescript-eslint/ban-types
  onError?: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSuccess?: Function
}): IRecoverPassword {
  const mutation = useMutation(
    (data) => {
      return axios.post('/forgot-password', data)
    },
    {
      onError: (err: any, variables, context) => {
        if (typeof onError === 'function') onError(err, variables, context)
        setFormApiErrors(form, err) // this is important to show backend errors on each specific field
      },
      onSuccess: (response: any, variables, context) => {
        if (typeof onSuccess === 'function') onSuccess(response, variables, context)
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
