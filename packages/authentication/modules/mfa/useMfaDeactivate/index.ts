import { useMutation, useQueryClient } from '@tanstack/react-query'

import MfaApi, { MFA_API_KEY } from '../../../services/mfa'
import { IUseMfaDeactivate } from './types'

const useMfaDeactivate = ({ options }: IUseMfaDeactivate = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ method, code }) => MfaApi.deactivate({ method, code }),
    ...options, // needs to be placed bellow all overridable options
    onError: (err, variables, context) => {
      options?.onError?.(err, variables, context)
    },
    onSuccess: (response, variables, context) => {
      queryClient.invalidateQueries(MFA_API_KEY.getActiveMethods())
      options?.onSuccess?.(response, variables, context)
    },
  })
}

export default useMfaDeactivate
