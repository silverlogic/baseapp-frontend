import { useEffect } from 'react'
import { useRouter }  from 'next/router'
import type { GetServerSidePropsResult } from 'next'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Cookies from 'js-cookie'
import { axios, useMutation, useQueryClient } from '../api'
import { COOKIE_NAME } from './constants'
import { useUserContext } from './context'
import type { IUserContext, ILogin, LoginRequiredServerSideProps } from './types'

export function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}): IUserContext {
  const router = useRouter()
  const { user, isLoading, isSuccess, isIdle, status, setUser, refetchUser } = useUserContext()

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || isLoading) return

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user)
    ) {
      router.push(redirectTo)
    }
  }, [user, redirectIfFound, redirectTo, isLoading])

  return { user, isLoading, isSuccess, isIdle, status, setUser, refetchUser }
}

export const loginRequiredServerSideProps: LoginRequiredServerSideProps = async (ctx, {redirectTo}) => {
  const token = ctx.req.cookies[COOKIE_NAME]
  if (!token) {
    return {
      redirect: {
        destination: redirectTo,
        statusCode: 307
      }
    } as GetServerSidePropsResult<any>
  }
  return {} as GetServerSidePropsResult<any>
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
  const { refetchUser } = useUserContext()

  const mutation = useMutation(data => {
    return axios.post('/login', data)
  }, {
    onError: (err: any, variables, context) => {
      if (typeof onError === 'function') onError(err, variables, context)
      formik.setErrors(err?.response?.data)
    },
    onSuccess: async (response, variables, context) => {
      Cookies.set(COOKIE_NAME, response.data.token, { secure: process.env.NODE_ENV === "production" })

      // by invalidating the cache we force a reload of /v1/users/me and the state used by useUser hook
      queryClient.invalidateQueries(['users', 'me'])

      // force refetch user from the api
      await refetchUser();

      if (typeof onSuccess === 'function') onSuccess(response, variables, context)
    },
    onSettled: (data, error, variables, context) => {
      formik.setSubmitting(false)
    }
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: any) => mutation.mutate(values),
  })

  return {formik, mutation}
}

export function useLogout() {
  const queryClient = useQueryClient()
  const { setUser } = useUserContext()

  return () => {
    Cookies.remove(COOKIE_NAME)

    // by invalidating the cache we force a reload of /v1/users/me and the state used by useUser hook
    queryClient.invalidateQueries(['users', 'me'])
    setUser(null)
  }
}
