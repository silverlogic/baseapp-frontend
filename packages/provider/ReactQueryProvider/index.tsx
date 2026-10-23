'use client'

import { FC, PropsWithChildren, useEffect, useState } from 'react'

import { useNotification } from '@baseapp-frontend/utils'

import { QueryClientConfig, QueryClientProvider } from '@tanstack/react-query'

import { QueryCacheOnError, ReactQueryProviderProps } from './types'
import {
  cancelQueryClientRetirement,
  getQueryClient,
  getSessionQueryClient,
  scheduleQueryClientRetirement,
} from './utils'

type SessionQueryClientProviderProps = PropsWithChildren<{
  sessionKey: string
  config: QueryClientConfig | undefined
  onError: QueryCacheOnError
}>

// Rendered with `key={sessionKey}`, so each session gets its own instance and client.
const SessionQueryClientProvider: FC<SessionQueryClientProviderProps> = ({
  children,
  sessionKey,
  config,
  onError,
}) => {
  // The client comes from a browser slot, so a render that suspends before committing gets the
  // same client again on retry.
  const [queryClient] = useState(() => getSessionQueryClient(sessionKey, config, onError))

  useEffect(() => {
    cancelQueryClientRetirement(queryClient)
    return () => scheduleQueryClientRetirement(queryClient)
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
      <SessionQueryClientProvider
        key={sessionKey}
        sessionKey={sessionKey}
        config={config}
        onError={onError}
      >
        {children}
      </SessionQueryClientProvider>
    )
  }

  const queryClient = getQueryClient(config, onError)

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default ReactQueryProvider
