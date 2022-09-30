import { IMfaActiveMethodResponse } from './types'
import Api from './api'
import { useQuery, useMutation, useQueryClient } from '../api'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { setFormApiErrors } from '../form/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

const activeMethodsQueryKey = ['mfa', 'user-active-methods']

export function useMfaActiveMethods({
  enabled = true,
  onError,
}: {
  enabled: boolean
  // eslint-disable-next-line @typescript-eslint/ban-types
  onError?: Function
}) {
  const [activeMethods, setActiveMethods] = useState<IMfaActiveMethodResponse[] | null>(null)
  const activeMethodsQueryKey = ['mfa', 'user-active-methods']

  const { isFetching: isLoading, data: response } = useQuery(
    activeMethodsQueryKey,
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
    queryKey: activeMethodsQueryKey,
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

export const codeValidationSchema = Yup.object().shape({
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
}) {
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
        queryClient.invalidateQueries(activeMethodsQueryKey)
        onSuccess?.(response, variables, context)
      },
    },
  )

  return {
    form: {
      ...form,
      handleSubmit: form.handleSubmit(async (values: any) => {
        try {
          values.method = method
          await mutation.mutateAsync(values)
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
        queryClient.invalidateQueries(activeMethodsQueryKey)
        onSuccess?.(response, variables, context)
      },
    },
  )
}
