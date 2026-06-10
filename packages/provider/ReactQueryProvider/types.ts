import { PropsWithChildren } from 'react'

import { Query, QueryClientConfig, QueryKey } from '@tanstack/react-query'

export interface ReactQueryProviderProps extends PropsWithChildren {
  config?: QueryClientConfig
}

export type QueryCacheOnError = (
  error: Error,
  query: Query<unknown, unknown, unknown, QueryKey>,
) => void

// Toast-related keys that queries can set on `meta`. Tanstack types `meta` as
// Record<string, unknown>, so the cache-level onError narrows it to this shape.
export interface QueryMetaToastOptions {
  sendErrorToast?: boolean
  toastMessage?: string
  toastType?: 'success' | 'info' | 'warning' | 'error'
}
