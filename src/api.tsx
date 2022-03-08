import React, { useState } from 'react'
import { Hydrate, QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import _axios from 'axios'
import humps from 'humps'
import { buildQueryString } from './queryString'
export { useMutation, useQuery, useQueryClient } from 'react-query'
import type { QueryFunction } from 'react-query'
import Cookies from 'js-cookie'
import { UserProvider } from './auth/context'

function createAxiosInstance(file = false) {
  const instance = _axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    paramsSerializer(params) {
      return buildQueryString(params)
    },
  })

  if (!file) {
    instance.defaults.headers.post['Content-Type'] = 'application/json'
    instance.defaults.headers.patch['Content-Type'] = 'application/json'
    instance.defaults.headers.put['Content-Type'] = 'application/json'
  } else {
    instance.defaults.headers.post['Content-Type'] = 'multipart/form-data'
    instance.defaults.headers.patch['Content-Type'] = 'multipart/form-data'
    instance.defaults.headers.put['Content-Type'] = 'multipart/form-data'
  }

  instance.interceptors.request.use(request => {
    const authToken = Cookies.get('Authorization')
    if (authToken) {
      if (request.headers && !request.headers.Authorization) {
        request.headers.Authorization = `Token ${authToken}`
      }
    }

    if (request.data && !file) {
      request.data = JSON.stringify(humps.decamelizeKeys(request.data))
    }

    return request
  })

  return instance
}

export const axios = createAxiosInstance()
axios.interceptors.response.use(response => {
  if (response.data && response.headers?.["content-type"] === "application/json") {
    response.data = humps.camelizeKeys(response.data)
  }
  return response
})

const axiosForFiles = createAxiosInstance(true)
axiosForFiles.interceptors.response.use(response => {
  if (response.data && response.headers?.["content-type"] === "application/json") {
    response.data = humps.camelizeKeys(response.data)
  }
  return response
})

// Define a default query function that will receive the query key
// the queryKey is guaranteed to be an Array here
const defaultQueryFn: QueryFunction = async ({ queryKey }) => {
  const path = typeof queryKey === "string" ? queryKey : queryKey.join("/")
  return await axios.get(path)
}

export const buildQueryClient = (defaultOptions?: any) => {
  const queryCache = new QueryCache()
  return new QueryClient({
    queryCache: queryCache,
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
        ...defaultOptions?.queries
      },
    },
  })
}

export const BaseAppProvider = ({pageProps, children, queryClientOptions}: {pageProps?: any, children: React.ReactNode, queryClientOptions?: any}) => {
  const [queryClient] = useState(() => buildQueryClient(queryClientOptions))
  return <QueryClientProvider client={queryClient} contextSharing={true}>
    <Hydrate state={pageProps?.dehydratedState}>
      <UserProvider>
        {children}
      </UserProvider>
    </Hydrate>
  </QueryClientProvider>
}
