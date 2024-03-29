import { useMutation } from '@tanstack/react-query'

import MfaApi from '../../../services/mfa'
import { IUseMfaActivate } from './types'

const useMfaActivate = ({ options, ApiClass = MfaApi }: IUseMfaActivate = {}) =>
  useMutation({
    mutationFn: ({ method }) => ApiClass.activate({ method }),
    ...options, // needs to be placed bellow all overridable options
    onError: (err, variables, context) => {
      options?.onError?.(err, variables, context)
    },
    onSuccess: (response, variables, context) => {
      options?.onSuccess?.(response, variables, context)
    },
  })

export default useMfaActivate
