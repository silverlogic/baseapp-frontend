'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import AllAuthApi from '../../../services/allAuth'
import type { UseAllAuthTOTPAuthenticatorDeactivate } from './types'

const useAllAuthTOTPAuthenticatorDeactivate = ({
  mutationOptions = {},
}: UseAllAuthTOTPAuthenticatorDeactivate) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => AllAuthApi.deactivateTOTPAuthenticator(),
    ...mutationOptions, // needs to be placed below all overridable options
    onError: (err, variables, context) => {
      mutationOptions?.onError?.(err, variables, context)
    },
    onSuccess: async (response, variables, context) => {
      mutationOptions?.onSuccess?.(response, variables, context)
      queryClient.invalidateQueries({ queryKey: AllAuthApi.QUERY_KEYS.getTOTPAuthenticator() })
    },
  })

  return {
    mutation,
  }
}

export default useAllAuthTOTPAuthenticatorDeactivate
