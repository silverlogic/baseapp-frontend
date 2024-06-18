import { useMutation, useQueryClient } from '@tanstack/react-query'

import MfaApi, { MFA_API_KEY } from '../../../services/mfa'
import { UseMfaDeactivateOptions } from './types'

const useMfaDeactivate = ({ options, ApiClass = MfaApi }: UseMfaDeactivateOptions = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ method, code }) => ApiClass.deactivate({ method, code }),
    ...options, // needs to be placed bellow all overridable options
    onError: (err, variables, context) => {
      options?.onError?.(err, variables, context)
    },
    onSuccess: (response, variables, context) => {
      queryClient.invalidateQueries({ queryKey: MFA_API_KEY.getActiveMethods() })
      options?.onSuccess?.(response, variables, context)
    },
  })
}

export default useMfaDeactivate
