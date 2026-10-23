import { QueryCache, QueryClient, QueryClientConfig } from '@tanstack/react-query'
import merge from 'lodash/merge'

import { DEFAULT_QUERY_CLIENT_CONFIG } from './constants'
import { QueryCacheOnError } from './types'

export const createQueryClient = (config: QueryClientConfig = {}, onError?: QueryCacheOnError) => {
  const combinedConfig = merge({}, DEFAULT_QUERY_CLIENT_CONFIG, config)
  const queryCache = new QueryCache({ onError })
  const combinedConfigWithCache = merge(combinedConfig, { queryCache })

  return new QueryClient(combinedConfigWithCache)
}

let browserQueryClient: QueryClient | undefined

export const getQueryClient = (config: QueryClientConfig = {}, onError?: QueryCacheOnError) => {
  // Server: always make a new query client
  if (typeof window === 'undefined') {
    return createQueryClient(config, onError)
  }

  // Browser: make a new query client if we don't already have one
  // This is very important, so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) {
    browserQueryClient = createQueryClient(config, onError)
  }
  return browserQueryClient
}

// The browser's current session client, kept outside React for the same reason as
// `browserQueryClient`: a render that suspends before it commits loses its state, and a new client
// on every retry would refetch (and suspend) forever.
let browserSessionQueryClient: { sessionKey: string; client: QueryClient } | undefined
const pendingRetirements = new Map<QueryClient, ReturnType<typeof setTimeout>>()

export const getSessionQueryClient = (
  sessionKey: string,
  config: QueryClientConfig = {},
  onError?: QueryCacheOnError,
) => {
  // Server: always make a new query client, never shared between requests.
  if (typeof window === 'undefined') {
    return createQueryClient(config, onError)
  }

  if (browserSessionQueryClient?.sessionKey !== sessionKey) {
    browserSessionQueryClient = { sessionKey, client: createQueryClient(config, onError) }
  }
  return browserSessionQueryClient.client
}

// Retirement is deferred and cancelled if the client mounts again before it runs: StrictMode's
// double mount, or a provider remounted with the same session.
export const cancelQueryClientRetirement = (client: QueryClient) => {
  clearTimeout(pendingRetirements.get(client))
  pendingRetirements.delete(client)
}

export const scheduleQueryClientRetirement = (client: QueryClient) => {
  cancelQueryClientRetirement(client)
  pendingRetirements.set(
    client,
    setTimeout(() => {
      pendingRetirements.delete(client)
      if (browserSessionQueryClient?.client === client) browserSessionQueryClient = undefined
      // A response from the old session that arrives later is dropped instead of cached.
      client.cancelQueries()
      client.clear()
    }, 0),
  )
}
