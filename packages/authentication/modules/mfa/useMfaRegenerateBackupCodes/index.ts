import { useMutation } from '@tanstack/react-query'

import MfaApi from '../../../services/mfa'
import type { UseMfaRegenerateBackupCodesOptions } from './types'

const useMfaRegenerateBackupCodes = ({
  options,
  ApiClass = MfaApi,
}: UseMfaRegenerateBackupCodesOptions = {}) =>
  useMutation({
    mutationFn: ({ method, code }) => ApiClass.regenerateBackupCodes({ method, code }),
    ...options, // needs to be placed below all overridable options
    onError: (err, variables, context) => {
      options?.onError?.(err, variables, context)
    },
    onSuccess: (response, variables, context) => {
      options?.onSuccess?.(response, variables, context)
    },
  })

export default useMfaRegenerateBackupCodes
