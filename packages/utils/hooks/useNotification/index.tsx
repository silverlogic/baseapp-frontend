'use client'

import React, { type PropsWithChildren, createContext, useContext, useRef } from 'react'

import { createStore, useStore } from 'zustand'

import { getApiErrorMessage } from '../../functions/api'
import { INITIAL_NOTIFICATION_STATE } from './constants'
import type { UseNotification } from './types'

type NotificationStore = ReturnType<typeof createNotificationStore>

const createNotificationStore = () =>
  createStore<UseNotification>((set) => ({
    ...INITIAL_NOTIFICATION_STATE,
    sendToast: (message, { type = 'success', shouldShowProgress } = {}) =>
      set({ message, type, open: true, shouldShowProgress }),
    sendApiErrorToast: (error, { shouldShowProgress } = {}) =>
      set({
        message: getApiErrorMessage(error),
        type: 'error',
        open: true,
        shouldShowProgress,
      }),
    closeToast: () => set({ open: false }),
  }))

const NotificationStoreContext = createContext<NotificationStore | null>(null)

export const NotificationProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<NotificationStore>(undefined)

  if (!storeRef.current) {
    storeRef.current = createNotificationStore()
  }

  return (
    <NotificationStoreContext.Provider value={storeRef.current}>
      {children}
    </NotificationStoreContext.Provider>
  )
}

const useNotification = <T extends UseNotification>(selector?: (state: UseNotification) => T) => {
  const store = useContext(NotificationStoreContext)
  if (!store) {
    throw new Error('Missing NotificationProvider. Make sure to wrap your component with it.')
  }

  return useStore(store, selector ?? ((state) => state as T))
}

export default useNotification
