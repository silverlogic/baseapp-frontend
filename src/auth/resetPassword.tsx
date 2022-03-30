import { IResetPassword } from './types'
import * as Yup from 'yup'
import { axios, useMutation } from '../api'
import { useFormik } from 'formik'

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
  initialValues = defaultInitialValues,
  onError,
  onSuccess,
}: {
  validationSchema?: any
  initialValues?: any
  onError?: Function
  onSuccess?: Function
}): IResetPassword {
  const mutation = useMutation(
    (data) => {
      return axios.post('/forgot-password/reset', data)
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
