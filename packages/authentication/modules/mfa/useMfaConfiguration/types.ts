import MfaApi from '../../../services/mfa'
import { MfaConfigurationResponse } from '../../../types/mfa'
import { CustomUseQueryOptions } from '../../../types/react-query'

type ApiClass = Pick<typeof MfaApi, 'getConfiguration'>

export interface UseMfaConfigurationOptions
  extends CustomUseQueryOptions<MfaConfigurationResponse, unknown, MfaConfigurationResponse> {
  ApiClass?: ApiClass
}
