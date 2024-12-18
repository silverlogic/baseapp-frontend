import type { QueryOptions } from '@tanstack/react-query'

import * as AllAuthTypes from '../../../types/allAuth'

export interface UseAllAuthRecoveryCodes {
  getRecoveryCodesQueryOptions: QueryOptions<AllAuthTypes.RecoveryCodesResponse>
}
