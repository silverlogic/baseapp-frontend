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

    const apply = (detail: CookieChangeEventDetail) => {
      const state = store.getState()
      if (detail.type === 'set') {
        state.setCookie(detail.key, detail.value)
      } else {
        state.removeCookie(detail.key)
      }
    }

    // window for the dispatching tab; BroadcastChannel for other tabs.
    const sameTabHandler = (event: Event) => {
      const { detail } = event as CustomEvent<CookieChangeEventDetail>
      if (detail) apply(detail)
    }
    window.addEventListener(COOKIE_CHANGE_EVENT, sameTabHandler)

    let channel: BroadcastChannel | undefined
    if (typeof BroadcastChannel !== 'undefined') {
      channel = new BroadcastChannel(COOKIE_CHANGE_EVENT)
      channel.onmessage = (event) => {
        const detail = event.data as CookieChangeEventDetail | undefined
        if (detail) apply(detail)
      }
    }

    return () => {
      window.removeEventListener(COOKIE_CHANGE_EVENT, sameTabHandler)
      channel?.close()
    }
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
