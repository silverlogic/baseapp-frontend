import { useQuery } from '@tanstack/react-query'

import MfaApi, { MFA_API_KEY } from '../../../services/mfa'
import type { UseMfaActiveMethodsOptions } from './types'

const useMfaActiveMethods = ({ options, ApiClass = MfaApi }: UseMfaActiveMethodsOptions = {}) => {
  const { enabled = true, ...restOptions } = options ?? {}

  const { data, ...rest } = useQuery({
    queryFn: () => ApiClass.getActiveMethods(),
    queryKey: MFA_API_KEY.getActiveMethods(),
    ...restOptions, // needs to be placed below all overridable options
    enabled,
  })

  return {
    activeMethods: data?.results,
    ...rest,
  }
}

export default useMfaActiveMethods
