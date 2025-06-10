'use client'

import { createContext, useContext, useRef } from 'react'

import { type StoreApi, useStore } from 'zustand'

import { MISSING_COOKIE_STORE_ERROR } from './constants'
import { initializeCookieStore } from './store'
import type { CookieProviderProps, CookieState } from './types'

export const CookieContext = createContext<StoreApi<CookieState> | null>(null)

export const CookieProvider = <T extends Record<string, any> = {}>({
  children,
  initialCookies,
}: CookieProviderProps<T>) => {
  const storeRef = useRef<StoreApi<CookieState>>(undefined)

  if (!storeRef.current) {
    storeRef.current = initializeCookieStore<T>(initialCookies)
  }

  const store = storeRef.current

  return <CookieContext.Provider value={store}>{children}</CookieContext.Provider>
}

const useCookie = <T extends Record<string, any> = {}>(): CookieState<T> => {
  const store = useContext(CookieContext)

  if (!store) {
    throw new Error(MISSING_COOKIE_STORE_ERROR)
  }

  return useStore(store) as CookieState<T>
}

export default useCookie
