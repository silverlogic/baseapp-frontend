'use client'

import { QueryCache, QueryClient, QueryClientConfig } from '@tanstack/react-query'

export const getQueryClient = (config: QueryClientConfig = {}) => {
  const queryCache = new QueryCache()

  return new QueryClient({ queryCache, ...config })
}
