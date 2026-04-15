import { setFormApiErrors } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { type SubmitHandler, useForm } from 'react-hook-form'

import AuthApi from '../../../services/auth'
import { ConfirmEmailParams } from '../../../types/auth'
import { DEFAULT_INITIAL_VALUES, DEFAULT_VALIDATION_SCHEMA } from './constants'
import type { RequestEmailChangeRequest, UseRequestEmailChange } from './types'

const useRequestEmailChange = ({
  validationSchema = DEFAULT_VALIDATION_SCHEMA,
  defaultValues = DEFAULT_INITIAL_VALUES,
  ApiClass = AuthApi,
  enableFormApiErrors = true,
  requestEmailChangeOptions = {},
  resendRequestEmailChangeOptions = {},
  verifyEmailChangeOptions = {},
  resendVerifyEmailChangeOptions = {},
  confirmEmailChangeOptions = {},
  cancelEmailChangeOptions = {},
}: UseRequestEmailChange) => {
  const form = useForm<RequestEmailChangeRequest>({
    defaultValues,
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
  })

  const requestEmailChangeMutation = useMutation({
    mutationFn: ({ newEmail }: RequestEmailChangeRequest) =>
      ApiClass.requestEmailChange({ newEmail }),
    ...requestEmailChangeOptions,
    onError: (err, variables, context) => {
      if (enableFormApiErrors) {
        setFormApiErrors(form, err)
      }
      requestEmailChangeOptions?.onError?.(err, variables, context)
    },
    onSuccess: (response, variables, context) => {
      requestEmailChangeOptions?.onSuccess?.(response, variables, context)
    },
  })

  const resendRequestEmailChangeMutation = useMutation({
    mutationFn: () => ApiClass.resendRequestEmailChange(),
    ...resendRequestEmailChangeOptions,
    onError: (err, variables, context) => {
      if (enableFormApiErrors) {
        setFormApiErrors(form, err)
      }
      resendRequestEmailChangeOptions?.onError?.(err, variables, context)
    },
    onSuccess: (response, variables, context) => {
      resendRequestEmailChangeOptions?.onSuccess?.(response, variables, context)
    },
  })

  const verifyEmailChangeMutation = useMutation({
    mutationFn: ({ id, token }: ConfirmEmailParams) => ApiClass.verifyEmailChange({ id, token }),
    ...verifyEmailChangeOptions,
    onError: (err, variables, context) => {
      if (enableFormApiErrors) {
        setFormApiErrors(form, err)
      }
      verifyEmailChangeOptions?.onError?.(err, variables, context)
    },
    onSuccess: (response, variables, context) => {
      verifyEmailChangeOptions?.onSuccess?.(response, variables, context)
    },
  })

  const resendVerifyEmailChangeMutation = useMutation({
    mutationFn: () => ApiClass.resendVerifyEmailChange(),
    ...resendVerifyEmailChangeOptions,
    onError: (err, variables, context) => {
      if (enableFormApiErrors) {
        setFormApiErrors(form, err)
      }
      resendVerifyEmailChangeOptions?.onError?.(err, variables, context)
    },
    onSuccess: (response, variables, context) => {
      resendVerifyEmailChangeOptions?.onSuccess?.(response, variables, context)
    },
  })

  const confirmEmailChangeMutation = useMutation({
    mutationFn: ({ id, token }: ConfirmEmailParams) => ApiClass.confirmEmailChange({ id, token }),
    ...confirmEmailChangeOptions,
    onError: (err, variables, context) => {
      if (enableFormApiErrors) {
        setFormApiErrors(form, err)
      }
      confirmEmailChangeOptions?.onError?.(err, variables, context)
    },
    onSuccess: (response, variables, context) => {
      confirmEmailChangeOptions?.onSuccess?.(response, variables, context)
    },
  })

  const cancelEmailChangeMutation = useMutation({
    mutationFn: () => ApiClass.cancelEmailChange(),
    ...cancelEmailChangeOptions,
    onError: (err, variables, context) => {
      if (enableFormApiErrors) {
        setFormApiErrors(form, err)
      }
      cancelEmailChangeOptions?.onError?.(err, variables, context)
    },
    onSuccess: (response, variables, context) => {
      cancelEmailChangeOptions?.onSuccess?.(response, variables, context)
    },
  })

  const handleSubmit: SubmitHandler<RequestEmailChangeRequest> = async (values) => {
    try {
      await requestEmailChangeMutation.mutateAsync(values)
    } catch (error) {
      // mutateAsync will raise an error if there's an API error
    }
  }

  return {
    form: {
      ...form,
      handleSubmit: form.handleSubmit(handleSubmit),
    },
    requestEmailChangeMutation,
    resendRequestEmailChangeMutation,
    verifyEmailChangeMutation,
    resendVerifyEmailChangeMutation,
    confirmEmailChangeMutation,
    cancelEmailChangeMutation,
  }
}

export default useRequestEmailChange
