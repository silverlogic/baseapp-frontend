import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import * as Yup from 'yup'

import { axios } from '../axios'
import { setFormApiErrors } from '../form/utils'
import { IAuthHookProps, ISignUp } from './types'

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
}: IAuthHookProps): ISignUp {
  const form = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  })

  const mutation = useMutation((data) => axios.post('/register', data), {
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
