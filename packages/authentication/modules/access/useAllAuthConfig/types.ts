import type { QueryOptions } from '@tanstack/react-query'

import * as AllAuthTypes from '../../../types/allAuth'

export interface UseAllAuthConfig {
  configQueryOptions: QueryOptions<AllAuthTypes.ConfigResponse>
}
