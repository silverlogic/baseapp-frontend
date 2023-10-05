import { UseQueryOptions } from '@tanstack/react-query'

import MfaApi from '../../../services/mfa'
import { IMfaConfigurationResponse } from '../../../types/mfa'

type ApiClass = Pick<typeof MfaApi, 'getConfiguration'>

export interface IUseMfaConfiguration {
  options?: UseQueryOptions<IMfaConfigurationResponse, unknown, IMfaConfigurationResponse, any>
  ApiClass?: ApiClass
}
