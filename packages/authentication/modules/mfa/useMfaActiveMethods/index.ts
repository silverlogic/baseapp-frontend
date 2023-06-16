import { useQuery } from '@tanstack/react-query'

import MfaApi, { MFA_API_KEY } from '../../../services/mfa'
import { IUseMfaActiveMethods } from './types'

const useMfaActiveMethods = ({ options }: IUseMfaActiveMethods = {}) => {
  const { enabled = true, ...restOptions } = options || {}

  const { data, ...rest } = useQuery({
    ...restOptions,
    queryFn: () => MfaApi.getActiveMethods(),
    queryKey: MFA_API_KEY.getActiveMethods(),
    enabled,
    onError: (...args) => {
      restOptions?.onError?.(...args)
    },
  })

  return {
    activeMethods: data?.results,
    ...rest,
  }
}

export default useMfaActiveMethods
