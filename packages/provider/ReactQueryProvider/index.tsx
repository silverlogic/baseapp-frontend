'use client'

import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react'

import { useNotification } from '@baseapp-frontend/utils'

import { QueryClientConfig, QueryClientProvider } from '@tanstack/react-query'

import { QueryCacheOnError, ReactQueryProviderProps } from './types'
import { createQueryClient, getQueryClient } from './utils'

type SessionQueryClientProviderProps = PropsWithChildren<{
  config: QueryClientConfig | undefined
  onError: QueryCacheOnError
}>

// Rendered with `key={sessionKey}`, so each session gets its own instance and client.
const SessionQueryClientProvider: FC<SessionQueryClientProviderProps> = ({
  children,
  config,
  onError,
}) => {
  const [queryClient] = useState(() => createQueryClient(config, onError))

  const pendingRetirement = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    // StrictMode mounts twice: a re-mount cancels the retirement scheduled by the first unmount.
    clearTimeout(pendingRetirement.current)
    return () => {
      pendingRetirement.current = setTimeout(() => {
        // A response from the old session that arrives later is dropped instead of cached.
        queryClient.cancelQueries()
        queryClient.clear()
      }, 0)
    }
  }, [queryClient])

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

const ReactQueryProvider: FC<ReactQueryProviderProps> = ({ children, config, sessionKey }) => {
  const { sendApiErrorToast, sendToast } = useNotification()

  const onError: QueryCacheOnError = (error, query) => {
    const { sendErrorToast, toastMessage, toastType } = query?.meta ?? {}
    if (sendErrorToast) {
      sendApiErrorToast(error)
    } else if (toastMessage) {
      sendToast(toastMessage, { type: toastType })
    }
  }

  if (sessionKey !== undefined) {
    return (
      <SessionQueryClientProvider key={sessionKey} config={config} onError={onError}>
        {children}
      </SessionQueryClientProvider>
    )
  }

  const queryClient = getQueryClient(config, onError)

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default ReactQueryProvider
