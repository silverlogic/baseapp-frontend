import { useQuery } from '@tanstack/react-query'

import MfaApi, { MFA_API_KEY } from '../../../services/mfa'
import { UseMfaConfigurationOptions } from './types'

const useMfaConfiguration = ({ options, ApiClass = MfaApi }: UseMfaConfigurationOptions = {}) => {
  const { enabled = true } = options ?? {}
  const { data: configuration, ...rest } = useQuery({
    queryFn: () => ApiClass.getConfiguration(),
    queryKey: MFA_API_KEY.getConfiguration(),
    ...options, // needs to be placed below all overridable options
    enabled,
  })

  return {
    configuration,
    ...rest,
  }
}

export default useMfaConfiguration
