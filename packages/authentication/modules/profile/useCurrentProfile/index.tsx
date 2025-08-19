'use client'

import { createContext, useContext, useRef } from 'react'

import { type StoreApi, useStore } from 'zustand'

import { MISSING_PROFILE_STORE_ERROR } from './constants'
import { initializeProfileStore } from './store'
import type { CurrentProfileProviderProps, CurrentProfileState } from './types'

export const CurrentProfileContext = createContext<StoreApi<CurrentProfileState> | null>(null)

export const CurrentProfileProvider = ({
  children,
  initialCurrentProfile,
}: CurrentProfileProviderProps) => {
  const storeRef = useRef<StoreApi<CurrentProfileState>>(undefined)

  if (!storeRef.current) {
    storeRef.current = initializeProfileStore(initialCurrentProfile)
  }

  const store = storeRef.current

  return <CurrentProfileContext.Provider value={store}>{children}</CurrentProfileContext.Provider>
}

const useCurrentProfile = (): CurrentProfileState => {
  const store = useContext(CurrentProfileContext)

  if (!store) {
    throw new Error(MISSING_PROFILE_STORE_ERROR)
  }

  return useStore(store)
}

export default useCurrentProfile
