import { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import type { GetServerSidePropsResult } from 'next'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { axios } from '../axios'
import { setFormApiErrors } from '../form/utils'
import MfaApi from '../mfa/api'
import { codeValidationInitialValues, codeValidationSchema } from '../mfa/hooks'
import { COOKIE_NAME } from './constants'
import { useUserContext } from './context'
import type {
  ILogin,
  ILoginHookProps,
  ILoginMfaRequest,
  ILoginMfaResponse,
  ILoginResponse,
  IUseUser,
  IUserContext,
  LoginRequiredServerSideProps,
} from './types'

export function useUser({ redirectTo = '', redirectIfFound = false }: IUseUser = {}): IUserContext {
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

export const loginRequiredServerSideProps: LoginRequiredServerSideProps = async (
  ctx,
  { redirectTo = '/auth/login' },
) => {
  const token = ctx.req.cookies[COOKIE_NAME]
  if (!token) {
    return {
      redirect: {
        destination: redirectTo,
        statusCode: 307,
      },
    } as GetServerSidePropsResult<any>
  }
  return { props: {} } as GetServerSidePropsResult<any>
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

export function useLogin({
  validationSchema = loginValidationSchema,
  defaultValues = defaultInitialValues,
  onError,
  onSuccess,
  onMfaError,
  onMfaSuccess,
}: ILoginHookProps): ILogin {
  const queryClient = useQueryClient()
  const { refetchUser } = useUserContext()
  const [mfaEphemeralToken, setMfaEphemeralToken] = useState<string | null>(null)

  /*
   * Handles login success with the auth token in response
   */
  async function handleLoginSuccess(response: AxiosResponse<ILoginResponse | ILoginMfaResponse>) {
    Cookies.set(COOKIE_NAME, (response.data as ILoginResponse).token, {
      secure: process.env.NODE_ENV === 'production',
    })

    // by invalidating the cache we force a reload of /v1/users/me and the state used by useUser hook
    queryClient.invalidateQueries(['users', 'me'])

    // force refetch user from the api
    await refetchUser()
  }

  function loginRequiresMfa(responseData: any) {
    return responseData && responseData.method
  }

  const form = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  })

  const mutation = useMutation((data) => axios.post('/login', data), {
    onError: (err: any, variables, context) => {
      onError?.(err, variables, context)
      setFormApiErrors(form, err)
    },
    onSuccess: async (
      response: AxiosResponse<ILoginResponse | ILoginMfaResponse>,
      variables,
      context,
    ) => {
      if (loginRequiresMfa(response.data)) {
        setMfaEphemeralToken((response.data as ILoginMfaResponse).ephemeralToken)
      } else {
        handleLoginSuccess(response)
      }
      onSuccess?.(response, variables, context)
    },
  })

  const mfaForm = useForm({
    defaultValues: codeValidationInitialValues,
    resolver: yupResolver(codeValidationSchema),
  })

  const mfaMutation = useMutation((data: ILoginMfaRequest) => MfaApi.loginStep2(data), {
    onError: (err: any, variables, context) => {
      onMfaError?.(err, variables, context)
      setFormApiErrors(form, err) // this is important to show backend errors on each specific field
    },
    onSuccess: (response: any, variables, context) => {
      handleLoginSuccess(response)
      onMfaSuccess?.(response, variables, context)
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
    mfaForm: {
      ...mfaForm,
      handleSubmit: mfaForm.handleSubmit(async (values: any) => {
        try {
          const newValues = { ...values, ephemeralToken: mfaEphemeralToken }
          await mfaMutation.mutateAsync(newValues)
        } catch (error) {
          // mutateAsync will raise an error if there's an API error
        }
      }),
    },
  }
}

export function useLogout() {
  const queryClient = useQueryClient()
  const { setUser } = useUserContext()

  return () => {
    Cookies.remove(COOKIE_NAME)

    // by invalidating the cache we force a reload of /v1/users/me and the state used by useUser hook
    queryClient.invalidateQueries(['users', 'me'])
    queryClient.invalidateQueries(['mfa'])
    setUser(null)
  }
}
