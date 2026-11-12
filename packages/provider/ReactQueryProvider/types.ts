import { PropsWithChildren } from 'react'

import { Query, QueryClientConfig, QueryKey } from '@tanstack/react-query'

export interface ReactQueryProviderProps extends PropsWithChildren {
  config?: QueryClientConfig
  /**
   * Names the session the query cache belongs to, e.g. `getSessionIdentity(access, refresh)` from
   * `@baseapp-frontend/utils`. Each key gets its own `QueryClient`: when it changes, the children
   * are remounted with a new, empty client, and the previous one has its queries cancelled and its
   * cache cleared. Leave it out to share one client for the whole browser tab, as before.
   */
  sessionKey?: string
}

export type QueryCacheOnError = (
  error: Error,
  query: Query<unknown, unknown, unknown, QueryKey>,
) => void
