import { ReactNode, useState } from 'react'

import { Hydrate, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { QueryFunction } from '@tanstack/react-query'

import { axios } from '../axios'
import { UserProvider } from './context'

// Define a default query function that will receive the query key
// the queryKey is guaranteed to be an Array here
const defaultQueryFn: QueryFunction = async ({ queryKey }) => {
  const path = typeof queryKey === 'string' ? queryKey : queryKey.join('/')
  return axios.get(path)
}

export const buildQueryClient = (defaultOptions?: any) => {
  const queryCache = new QueryCache()
  return new QueryClient({
    queryCache,
    defaultOptions: {
      ...defaultOptions,
      queries: {
        staleTime: 5 * 60 * 1000,
        cacheTime: 5 * 60 * 1000,
        queryFn: defaultQueryFn,
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        retryOnMount: false,
        ...defaultOptions?.queries,
      },
    },
  })
}

export const BaseAppProvider = ({
  pageProps,
  children,
  queryClientOptions,
}: {
  pageProps?: any
  children: ReactNode
  queryClientOptions?: any
}) => {
  const [queryClient] = useState(() => buildQueryClient(queryClientOptions))
  return (
    <QueryClientProvider client={queryClient} contextSharing>
      {/* @ts-ignore */}
      <Hydrate state={pageProps?.dehydratedState}>
        <UserProvider>{children}</UserProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

BaseAppProvider.defaultProps = {
  pageProps: {},
  queryClientOptions: {},
}
