import { useMutation } from '@tanstack/react-query'

import MfaApi from '../../../services/mfa'
import { IUseMfaActivate } from './types'

const useMfaActivate = ({ options }: IUseMfaActivate = {}) =>
  useMutation({
    ...options,
    mutationFn: ({ method }) => MfaApi.activate({ method }),
    onError: (err, variables, context) => {
      options?.onError?.(err, variables, context)
    },
    onSuccess: (response, variables, context) => {
      options?.onSuccess?.(response, variables, context)
    },
  })

export default useMfaActivate
