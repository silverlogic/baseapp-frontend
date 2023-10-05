import { IDjangoPaginatedResponse } from '@baseapp-frontend/utils'

import { UseQueryOptions } from '@tanstack/react-query'

import MfaApi from '../../../services/mfa'
import { IMfaActiveMethodResponse } from '../../../types/mfa'

type ApiClass = Pick<typeof MfaApi, 'getActiveMethods'>

export interface IUseMfaActiveMethods {
  options?: UseQueryOptions<
    IDjangoPaginatedResponse<IMfaActiveMethodResponse>,
    unknown,
    IDjangoPaginatedResponse<IMfaActiveMethodResponse>,
    any
  >
  ApiClass?: ApiClass
}
