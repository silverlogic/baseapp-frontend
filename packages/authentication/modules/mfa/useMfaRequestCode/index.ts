import { useMutation } from '@tanstack/react-query'

import MfaApi from '../../../services/mfa'
import type { UseMfaRequestCodeOptions } from './types'

const useMfaRequestCode = ({ options, ApiClass = MfaApi }: UseMfaRequestCodeOptions = {}) =>
  useMutation({
    // `mutate()` with no variables requests a code for the primary method
    mutationFn: (variables) => ApiClass.sendCode(variables ?? {}),
    ...options, // needs to be placed below all overridable options
    onError: (err, variables, context) => {
      options?.onError?.(err, variables, context)
    },
    onSuccess: (response, variables, context) => {
      options?.onSuccess?.(response, variables, context)
    },
  })

export default useMfaRequestCode
