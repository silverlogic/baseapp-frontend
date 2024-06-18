import { DjangoPaginatedResponse } from '@baseapp-frontend/utils'

import MfaApi from '../../../services/mfa'
import { MfaActiveMethodResponse } from '../../../types/mfa'
import { CustomUseQueryOptions } from '../../../types/react-query'

type ApiClass = Pick<typeof MfaApi, 'getActiveMethods'>

export interface UseMfaActiveMethodsOptions
  extends CustomUseQueryOptions<
    DjangoPaginatedResponse<MfaActiveMethodResponse>,
    unknown,
    DjangoPaginatedResponse<MfaActiveMethodResponse>
  > {
  ApiClass?: ApiClass
}
