import { QueryCache, QueryClient, QueryClientConfig } from '@tanstack/react-query'
import merge from 'lodash/merge'

import { DEFAULT_QUERY_CLIENT_CONFIG } from './constants'
import { QueryCacheOnError } from './types'

const createQueryClient = (config: QueryClientConfig = {}, onError?: QueryCacheOnError) => {
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
