'use client'

import React, { type FC, type PropsWithChildren, createContext, useContext, useRef } from 'react'

import { createStore, useStore } from 'zustand'

import { getApiErrorMessage } from '../../functions/api'
import { INITIAL_NOTIFICATION_STATE } from './constants'
import type { UseNotification } from './types'

const createNotificationStore = () =>
  createStore<UseNotification>((set) => ({
    ...INITIAL_NOTIFICATION_STATE,
    sendToast: (message, { type = 'success' } = {}) => set({ message, type, open: true }),
    sendApiErrorToast: (error) =>
      set({ message: getApiErrorMessage(error), type: 'error', open: true }),
    closeToast: () => set({ open: false }),
  }))

const NotificationStoreContext = createContext<ReturnType<typeof createNotificationStore> | null>(
  null,
)

export const NotificationProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<ReturnType<typeof createNotificationStore>>()

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
