import { useQuery } from '@tanstack/react-query'

import MfaApi, { MFA_API_KEY } from '../../../services/mfa'
import { IUseMfaActiveMethods } from './types'

const useMfaActiveMethods = ({ options, ApiClass = MfaApi }: IUseMfaActiveMethods = {}) => {
  const { enabled = true, ...restOptions } = options || {}

  const { data, ...rest } = useQuery({
    queryFn: () => ApiClass.getActiveMethods(),
    queryKey: MFA_API_KEY.getActiveMethods(),
    ...restOptions, // needs to be placed bellow all overridable options
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
