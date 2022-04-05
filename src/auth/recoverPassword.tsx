import * as Yup from 'yup'
import { useFormik } from 'formik'
import { IRecoverPassword } from './types'
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
  initialValues = defaultInitialValues,
  onError,
  onSuccess,
}: {
  validationSchema?: any
  initialValues?: any
  onError?: Function
  onSuccess?: Function
}): IRecoverPassword {
  const mutation = useMutation(
    (data) => {
      return axios.post('/forgot-password', data)
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
