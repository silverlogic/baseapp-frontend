import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { ISignUp } from './types'
import { setFormApiErrors } from './utils'
import { axios, useMutation } from '../api'

export const phoneRegex = /^(\([0-9]{3}\)|[0-9]{3}-|[0-9]{3})\s?[0-9]{3}-?[0-9]{4}$/

export const signUpValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('This field is required'),
  lastName: Yup.string().required('This field is required'),
  password: Yup.string().required('This field is required'),
  phoneNumber: Yup.string().matches(phoneRegex, 'Please provide a properly formatted phone number'),
  email: Yup.string()
    .email('Please provide a properly formatted email address')
    .required('This field is required'),
  acceptConsent: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
})

const defaultInitialValues = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  password: '',
  acceptConsent: false,
}
export function useSignUp({
  validationSchema = signUpValidationSchema,
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
}): ISignUp {
  const mutation = useMutation(
    (data) => {
      return axios.post('/register', data)
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
