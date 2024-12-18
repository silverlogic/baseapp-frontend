import type { UseMutationOptions } from '@tanstack/react-query'

import * as AllAuthTypes from '../../../types/allAuth'

export interface UseAllAuthSessions {
  endSessionsMutationOptions?: UseMutationOptions<
    AllAuthTypes.SessionsResponse,
    unknown,
    AllAuthTypes.EndSessionsRequest,
    any
  >
}
