'use client'

import { createContext, useContext, useEffect, useRef } from 'react'

import { type StoreApi, useStore } from 'zustand'

import {
  COOKIE_CHANGE_EVENT,
  type CookieChangeEventDetail,
  MISSING_COOKIE_STORE_ERROR,
} from './constants'
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

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const handler = (event: Event) => {
      const { detail } = event as CustomEvent<CookieChangeEventDetail>
      if (!detail) return

      const state = store.getState()
      if (detail.type === 'set') {
        state.setCookie(detail.key, detail.value)
      } else {
        state.removeCookie(detail.key)
      }
    }

    window.addEventListener(COOKIE_CHANGE_EVENT, handler)
    return () => window.removeEventListener(COOKIE_CHANGE_EVENT, handler)
  }, [store])

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
