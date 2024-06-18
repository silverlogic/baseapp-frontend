'use client'

import { FC } from 'react'

import { useNotification } from '@baseapp-frontend/utils'

import { QueryClientProvider } from '@tanstack/react-query'

import { QueryCacheOnError, ReactQueryProviderProps } from './types'
import { getQueryClient } from './utils'

const ReactQueryProvider: FC<ReactQueryProviderProps> = ({ children, config }) => {
  const { sendApiErrorToast, sendToast } = useNotification()

  const onError: QueryCacheOnError = (error, query) => {
    const { sendErrorToast, toastMessage, toastType } = query?.meta ?? {}
    if (sendErrorToast) {
      sendApiErrorToast(error)
    } else if (toastMessage) {
      sendToast(toastMessage, { type: toastType })
    }
  }

  const queryClient = getQueryClient(config, onError)

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default ReactQueryProvider
