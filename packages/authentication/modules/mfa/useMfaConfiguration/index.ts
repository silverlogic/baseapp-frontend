import { useQuery } from '@tanstack/react-query'

import MfaApi, { MFA_API_KEY } from '../../../services/mfa'
import { IUseMfaConfiguration } from './types'

const useMfaConfiguration = ({ options, ApiClass = MfaApi }: IUseMfaConfiguration = {}) => {
  const { enabled = true, ...restOptions } = options || {}
  const { data: configuration, ...rest } = useQuery({
    queryFn: () => ApiClass.getConfiguration(),
    queryKey: MFA_API_KEY.getConfiguration(),
    ...options, // needs to be placed bellow all overridable options
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
