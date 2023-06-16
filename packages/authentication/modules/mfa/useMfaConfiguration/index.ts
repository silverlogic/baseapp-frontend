import { useQuery } from '@tanstack/react-query'

import MfaApi, { MFA_API_KEY } from '../../../services/mfa'
import { IUseMfaConfiguration } from './types'

const useMfaConfiguration = ({ options }: IUseMfaConfiguration = {}) => {
  const { enabled = true, ...restOptions } = options || {}
  const { data: configuration, ...rest } = useQuery({
    ...options,
    queryFn: () => MfaApi.getConfiguration(),
    queryKey: MFA_API_KEY.getConfiguration(),
    enabled,
    onError: (...args) => {
      restOptions?.onError?.(...args)
    },
  })

  return {
    configuration,
    ...rest,
  }
}

export default useMfaConfiguration
