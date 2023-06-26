import { setFormApiErrors } from '@baseapp-frontend/utils'

import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import MfaApi, { MFA_API_KEY } from '../../../services/mfa'
import { CODE_VALIDATION_INITIAL_VALUES, CODE_VALIDATION_SCHEMA } from '../constants'
import { IUseMfaActivateConfirm } from './types'

const useMfaActivateConfirm = ({
  method,
  validationSchema = CODE_VALIDATION_SCHEMA,
  defaultValues = CODE_VALIDATION_INITIAL_VALUES,
  options = {},
}: IUseMfaActivateConfirm) => {
  const form = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  })
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (data) => MfaApi.confirmActivation(data),
    ...options, // needs to be placed bellow all overridable options
    onError: (err, variables, context) => {
      options?.onError?.(err, variables, context)
      setFormApiErrors(form, err) // this is important to show backend errors on each specific field
    },
    onSuccess: (response, variables, context) => {
      options?.onSuccess?.(response, variables, context)
      queryClient.invalidateQueries(MFA_API_KEY.getActiveMethods())
    },
  })

  return {
    form: {
      ...form,
      // TODO: refactor types
      handleSubmit: form.handleSubmit(async (values: any) => {
        try {
          const newValues = { ...values, method }
          await mutation.mutateAsync(newValues)
        } catch (error) {
          // mutateAsync will raise an error if there's an API error
        }
        // TODO: refactor types
      }) as any,
    },
    mutation,
  }
}

export default useMfaActivateConfirm
