import MfaApi from '../../../services/mfa'
import type { MfaConfigurationResponse } from '../../../types/mfa'
import type { CustomUseQueryOptions } from '../../../types/react-query'

type ApiClass = Pick<typeof MfaApi, 'getConfiguration'>

export interface UseMfaConfigurationOptions
  extends CustomUseQueryOptions<MfaConfigurationResponse, unknown, MfaConfigurationResponse> {
  ApiClass?: ApiClass
}
