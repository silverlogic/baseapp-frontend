import { useState, useEffect } from 'react'
import { useRouter }  from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Cookies from 'js-cookie'
import { axios, useMutation, useQuery, useQueryClient } from '../api'
import type { UseMutationResult } from 'react-query'
import type { FormikProps } from 'formik'

const COOKIE_NAME = 'Authorization'

export interface IUser {
  email: string,
}

export interface IUserResult {
  user: IUser | null
  isLoading: boolean
  isSuccess: boolean
  isIdle: boolean
  status: string
}

export interface ILogin {
  formik: FormikProps<any>
  mutation: UseMutationResult<unknown, unknown, void, unknown>
}

export function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}): IUserResult {
  const router = useRouter()
  const [user, setUser] = useState<IUser | null>(null)
  const token = Cookies.get(COOKIE_NAME)

  const { isLoading, isSuccess, isIdle, status } = useQuery({
    queryKey: '/users/me',
    staleTime: Infinity, // makes cache never expire automatically
    enabled: !!token,
    useErrorBoundary: false,
    onSuccess: (response: any) => {
      setUser(response?.data)
    },
    onError: (error: any) => {
      if (error?.response?.status === 401) {
        // since response is 401 Unauthorized it also prabably has the body:
        // {"detail":"Invalid token."}
        // better remove the cookie
        Cookies.remove(COOKIE_NAME)
      }
      setUser(null)
    },
  })

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user)
    ) {
      router.push(redirectTo)
    }
  }, [user, redirectIfFound, redirectTo])

  return { user, isLoading, isSuccess, isIdle, status }
}

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please provide a properly formatted email address')
    .required('This field is required'),
  password: Yup.string().required('This field is required'),
})

const defaultInitialValues = {
    email: '',
    password: '',
}

export function useLogin({validationSchema = loginValidationSchema, initialValues = defaultInitialValues, onError, onSuccess}: {validationSchema?: any, initialValues?: any, onError?: Function, onSuccess?: Function}): ILogin {
  const queryClient = useQueryClient()

  const mutation = useMutation(data => {
    return axios.post('/login', data)
  }, {
    onError: (err: any, variables, context) => {
      if (typeof onError === 'function') onError(err, variables, context)
      formik.setErrors(err?.response?.data)
    },
    onSuccess: (response, variables, context) => {
      Cookies.set(COOKIE_NAME, response.data.token, { secure: process.env.NODE_ENV === "production" })

      // by invalidating the cache we force a reload of /v1/users/me and the state used by useUser hook
      queryClient.invalidateQueries(['users', 'me'])

      if (typeof onSuccess === 'function') onSuccess(response, variables, context)
    },
    onSettled: (data, error, variables, context) => {
      formik.setSubmitting(false)
    }
  })

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values: any) => mutation.mutate(values),
  })

  return {formik, mutation}
}

export function useLogout() {
  const queryClient = useQueryClient()

  return () => {
    Cookies.remove(COOKIE_NAME)

    // by invalidating the cache we force a reload of /v1/users/me and the state used by useUser hook
    queryClient.invalidateQueries(['users', 'me'])
  }
}
