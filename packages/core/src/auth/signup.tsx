import { useFormik } from 'formik'
import * as Yup from 'yup'
import { axios, useMutation } from '../api'
import { useLogin } from './login'
import type { UseMutationResult } from 'react-query'
import type { FormikProps } from 'formik'

export interface ISignUp {
  formik: FormikProps<any>
  mutation: UseMutationResult<unknown, unknown, void, unknown>
}

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
  initialValues = defaultInitialValues,
  onError,
  onSuccess,
}: {
  validationSchema?: any
  initialValues?: any
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
        formik.setErrors(err?.response?.data) // this is important to show backend errors on each specific field
      },
      onSuccess: (response: any, variables, context) => {
        if (typeof onSuccess === 'function') onSuccess(response, variables, context)
      },
      onSettled: (data, error, variables, context) => {
        formik.setSubmitting(false)
      },
    },
  )

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => mutation.mutate(values),
  })

  return { formik, mutation }
}
