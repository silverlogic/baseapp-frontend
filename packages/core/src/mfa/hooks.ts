import { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { setFormApiErrors } from '../form/utils'
import Api from './api'
import { IMfaActivateConfirm, IMfaActiveMethodResponse } from './types'

const ACTIVE_METHODS_QUERY_KEY = ['mfa', 'user-active-methods']

export function useMfaActiveMethods({
  enabled = true,
  onError,
}: {
  enabled: boolean
  // eslint-disable-next-line @typescript-eslint/ban-types
  onError?: Function
}) {
  const [activeMethods, setActiveMethods] = useState<IMfaActiveMethodResponse[] | null>(null)

  const { isFetching: isLoading, data: response } = useQuery(
    ACTIVE_METHODS_QUERY_KEY,
    () => Api.getActiveMethods(),
    {
      enabled,
      onError: (...args) => {
        onError?.(...args)
      },
    },
  )

  useEffect(() => {
    if (response) {
      setActiveMethods(response.data.results)
    }
  }, [response])

  return {
    queryKey: ACTIVE_METHODS_QUERY_KEY,
    isLoading,
    activeMethods,
  }
}

export function useMfaConfiguration({
  enabled = true,
  onError,
}: {
  enabled: boolean
  // eslint-disable-next-line @typescript-eslint/ban-types
  onError?: Function
}) {
  const [configuration, setConfiguration] = useState<any | null>(null)
  const queryKey = ['mfa', 'configuration']

  const {
    isFetching: isLoading,
    isError,
    data: response,
  } = useQuery(queryKey, () => Api.getConfiguration(), {
    enabled,
    onError: (...args) => {
      onError?.(...args)
    },
  })

  useEffect(() => {
    if (response) {
      setConfiguration(response?.data)
    }
  }, [response])

  return {
    queryKey,
    isLoading,
    isError,
    configuration,
  }
}

export function useMfaActivate({
  onError,
  onSuccess,
}: {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onError?: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSuccess?: Function
} = {}) {
  return useMutation((data: { method: string }) => Api.activate(data.method), {
    onError: (err: any, variables, context) => {
      onError?.(err, variables, context)
    },
    onSuccess: (response: any, variables, context) => {
      onSuccess?.(response, variables, context)
    },
  })
}

export const codeValidationSchema: any = Yup.object().shape({
  code: Yup.string().required('This field is required'),
})

export const codeValidationInitialValues = {
  code: '',
}

export function useMfaActivateConfirm({
  method,
  validationSchema = codeValidationSchema,
  defaultValues = codeValidationInitialValues,
  onError,
  onSuccess,
}: {
  method: string
  validationSchema?: any
  defaultValues?: any
  // eslint-disable-next-line @typescript-eslint/ban-types
  onError?: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSuccess?: Function
}): IMfaActivateConfirm {
  const form = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  })
  const queryClient = useQueryClient()

  const mutation = useMutation(
    (data: { method: string; code: string }) => Api.confirmActivation(data.method, data.code),
    {
      onError: (err: any, variables, context) => {
        onError?.(err, variables, context)
        setFormApiErrors(form, err) // this is important to show backend errors on each specific field
      },
      onSuccess: (response: any, variables, context) => {
        queryClient.invalidateQueries(ACTIVE_METHODS_QUERY_KEY)
        onSuccess?.(response, variables, context)
      },
    },
  )

  return {
    form: {
      ...form,
      handleSubmit: form.handleSubmit(async (values: any) => {
        try {
          const newValues = { ...values, method }
          await mutation.mutateAsync(newValues)
        } catch (error) {
          // mutateAsync will raise an error if there's an API error
        }
      }),
    },
    mutation,
  }
}

export function useMfaDeactivate({
  onError,
  onSuccess,
}: {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onError?: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSuccess?: Function
} = {}) {
  const queryClient = useQueryClient()

  return useMutation(
    (data: { method: string; code?: string }) => Api.deactivate(data.method, data.code),
    {
      onError: (err: any, variables, context) => {
        onError?.(err, variables, context)
      },
      onSuccess: (response: any, variables, context) => {
        queryClient.invalidateQueries(ACTIVE_METHODS_QUERY_KEY)
        onSuccess?.(response, variables, context)
      },
    },
  )
}
