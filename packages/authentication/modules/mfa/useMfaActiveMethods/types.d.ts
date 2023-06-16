import { IDjangoPaginatedResponse } from '@baseapp-frontend/utils'

import { UseQueryOptions } from '@tanstack/react-query'

import { IMfaActiveMethodResponse } from '../../../types/mfa'

export interface IUseMfaActiveMethods {
  options?: UseQueryOptions<
    IDjangoPaginatedResponse<IMfaActiveMethodResponse>,
    unknown,
    IDjangoPaginatedResponse<IMfaActiveMethodResponse>,
    any
  >
}
