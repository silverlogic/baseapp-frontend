'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import AllAuthApi from '../../../../services/allAuth'
import type { UseAllAuthRecoveryCodesGenerate } from './types'

export const useAllAuthRecoveryCodesGenerate = ({
  mutationOptions = {},
}: UseAllAuthRecoveryCodesGenerate) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => AllAuthApi.generateRecoveryCodes(),
    ...mutationOptions, // needs to be placed below all overridable options
    onError: (err, variables, context) => {
      mutationOptions?.onError?.(err, variables, context)
    },
    onSuccess: async (response, variables, context) => {
      // TODO: Test this is good
      queryClient.setQueryData(AllAuthApi.QUERY_KEYS.getRecoveryCodes(), response)
      // queryClient.invalidateQueries({ queryKey: AllAuthApi.QUERY_KEYS.getRecoveryCodes() })
      mutationOptions?.onSuccess?.(response, variables, context)
    },
  })

  return {
    mutation,
  }
}
