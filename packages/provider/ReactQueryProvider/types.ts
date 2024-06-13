import { PropsWithChildren } from 'react'

import { Query, QueryClientConfig, QueryKey } from '@tanstack/react-query'

export interface ReactQueryProviderProps extends PropsWithChildren {
  config?: QueryClientConfig
}

export type QueryCacheOnError = (
  error: Error,
  query: Query<unknown, unknown, unknown, QueryKey>,
) => void
