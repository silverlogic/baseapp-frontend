import { useState } from 'react'

import { COOKIE_NAME, setFormApiErrors } from '@baseapp-frontend/utils'

import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { FieldValues, useForm } from 'react-hook-form'

import AuthApi from '../../../services/auth'
import MfaApi from '../../../services/mfa'
import { USER_API_KEY } from '../../../services/user'
import { ILoginMfaRequest, ILoginRegularResponse, ILoginRequest } from '../../../types/auth'
import { CODE_VALIDATION_INITIAL_VALUES, CODE_VALIDATION_SCHEMA } from '../../mfa/constants'
import { useUser } from '../../user'
import { DEFAULT_INITIAL_VALUES, DEFAULT_VALIDATION_SCHEMA } from './constants'
import { IUseLogin } from './types'
import { isLoginMfaResponse } from './utils'

const useLogin = ({
  validationSchema = DEFAULT_VALIDATION_SCHEMA,
  defaultValues = DEFAULT_INITIAL_VALUES,
  loginOptions = {},
  mfaOptions = {},
}: IUseLogin) => {
  const queryClient = useQueryClient()
  const [mfaEphemeralToken, setMfaEphemeralToken] = useState<string | null>(null)
  const { refetch: refetchUser } = useUser()

  /*
   * Handles login success with the auth token in response
   */
  async function handleLoginSuccess(response: ILoginRegularResponse) {
    Cookies.set(COOKIE_NAME, response.token, {
      secure: process.env.NODE_ENV === 'production',
    })

    // by invalidating the cache we force a reload of /v1/users/me and the state used by useUser hook
    queryClient.invalidateQueries(USER_API_KEY.getUser())
    refetchUser()
  }

  const form = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  })

  const mutation = useMutation({
    ...loginOptions,
    mutationFn: (data: ILoginRequest) => AuthApi.login(data),
    onError: (err, variables, context) => {
      loginOptions?.onError?.(err, variables, context)
      setFormApiErrors(form, err)
    },
    onSuccess: async (response, variables, context) => {
      if (isLoginMfaResponse(response)) {
        setMfaEphemeralToken(response.ephemeralToken)
      } else {
        handleLoginSuccess(response)
      }
      loginOptions?.onSuccess?.(response, variables, context)
    },
  })

  const mfaForm = useForm({
    // TODO: refactor types
    defaultValues: CODE_VALIDATION_INITIAL_VALUES as FieldValues,
    resolver: yupResolver(CODE_VALIDATION_SCHEMA as any),
  })

  const mfaMutation = useMutation((data: ILoginMfaRequest) => MfaApi.loginStep2(data), {
    ...mfaOptions,
    onError: (err, variables, context) => {
      mfaOptions?.onError?.(err, variables, context)
      setFormApiErrors(form, err) // this is important to show backend errors on each specific field
    },
    onSuccess: (response, variables, context) => {
      handleLoginSuccess(response)
      mfaOptions?.onSuccess?.(response, variables, context)
    },
  })

  return {
    form: {
      ...form,
      // TODO: refactor types
      handleSubmit: form.handleSubmit(async (values) => {
        try {
          await mutation.mutateAsync(values)
        } catch (error) {
          // mutateAsync will raise an error if there's an API error
        }
        // TODO: refactor types
      }) as any,
    },
    mutation,
    mfaForm: {
      ...mfaForm,
      // TODO: refactor types
      handleSubmit: mfaForm.handleSubmit(async (values: any) => {
        try {
          const newValues = { ...values, ephemeralToken: mfaEphemeralToken }
          await mfaMutation.mutateAsync(newValues)
        } catch (error) {
          // mutateAsync will raise an error if there's an API error
        }
        // TODO: refactor types
      }) as any,
    },
    mfaMutation,
  }
}

export default useLogin
