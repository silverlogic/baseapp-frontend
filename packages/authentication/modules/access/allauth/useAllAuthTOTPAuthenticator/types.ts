import type { QueryOptions } from '@tanstack/react-query'

import type * as AllAuthTypes from '../../../../types/allAuth'

export interface UseAllAuthTOTPAuthenticator {
  getTOTPAuthenticatorQueryOptions: QueryOptions<AllAuthTypes.TOTPAuthenticatorResponse>
}
