'use client'

import { createContext, useContext, useEffect, useRef } from 'react'

import { type StoreApi, useStore } from 'zustand'

import {
  COOKIE_CHANGE_EVENT,
  type CookieChangeEventDetail,
  MISSING_COOKIE_STORE_ERROR,
} from './constants'
import { subscribeToCookieChanges } from './emitter'
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
    const apply = (detail: CookieChangeEventDetail) => {
      const state = store.getState()
      if (detail.type === 'set') {
        state.setCookie(detail.key, detail.value)
      } else {
        state.removeCookie(detail.key)
      }
    }

    // Always subscribe to the DOM-free emitter: this is the only sync path on
    // React Native (no `window.dispatchEvent`/`BroadcastChannel`) and a no-op
    // on web when nothing emits through it.
    const unsubscribe = subscribeToCookieChanges(apply)

    // React Native exposes a global `window` but no DOM event APIs, so we check
    // the method itself rather than the object's existence.
    const hasWindowEvents =
      typeof window !== 'undefined' && typeof window.addEventListener === 'function'

    let removeWindowListener: (() => void) | undefined
    let channel: BroadcastChannel | undefined

    if (hasWindowEvents) {
      // window for the dispatching tab; BroadcastChannel for other tabs.
      const sameTabHandler = (event: Event) => {
        const { detail } = event as CustomEvent<CookieChangeEventDetail>
        if (detail) apply(detail)
      }
      window.addEventListener(COOKIE_CHANGE_EVENT, sameTabHandler)
      removeWindowListener = () => window.removeEventListener(COOKIE_CHANGE_EVENT, sameTabHandler)

      if (typeof BroadcastChannel !== 'undefined') {
        channel = new BroadcastChannel(COOKIE_CHANGE_EVENT)
        channel.onmessage = (event) => {
          const detail = event.data as CookieChangeEventDetail | undefined
          if (detail) apply(detail)
        }
      }
    }

    return () => {
      unsubscribe()
      removeWindowListener?.()
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
