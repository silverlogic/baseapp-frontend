import { UseQueryOptions } from '@tanstack/react-query'

import { IMfaConfigurationResponse } from '../../../types/mfa'

export interface IUseMfaConfiguration {
  options?: UseQueryOptions<IMfaConfigurationResponse, unknown, IMfaConfigurationResponse, any>
}
