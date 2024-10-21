import { useMutation } from '@tanstack/react-query'

import MfaApi from '../../../services/mfa'
import type { UseMfaActivateOptions } from './types'

const useMfaActivate = ({ options, ApiClass = MfaApi }: UseMfaActivateOptions = {}) =>
  useMutation({
    mutationFn: ({ method }) => ApiClass.activate({ method }),
    ...options, // needs to be placed below all overridable options
    onError: (err, variables, context) => {
      options?.onError?.(err, variables, context)
    },
    onSuccess: (response, variables, context) => {
      options?.onSuccess?.(response, variables, context)
    },
  })

export default useMfaActivate
