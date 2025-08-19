import { type StoreApi, createStore } from 'zustand'

import { MISSING_COOKIE_STORE_ERROR } from './constants'
import type { BaseCookies, CookieState } from './types'

let cookieStore: StoreApi<CookieState> | null = null

const createCookieStore = <T extends Record<string, any> = {}>(
  initialCookies?: BaseCookies & T,
): StoreApi<CookieState<T>> =>
  createStore<CookieState<T>>()((set) => ({
    cookies: initialCookies,
    setCookie: (key: string, value: string) =>
      set((state) => ({
        cookies: { ...state.cookies, [key]: value } as BaseCookies & T,
      })),
    removeCookie: (key: string) =>
      set((state) => {
        const newCookies = { ...state.cookies }
        delete newCookies[key]
        return { cookies: newCookies as BaseCookies & T }
      }),
  }))

export const initializeCookieStore = <T extends Record<string, any> = {}>(
  initialCookies?: BaseCookies & T,
): StoreApi<CookieState<T>> => {
  if (
    // Create a new store in dev mode to prevent HMR from preserving stale data
    process.env.NODE_ENV === 'development' ||
    !cookieStore ||
    (initialCookies && Object.keys(initialCookies).length > 0)
  ) {
    cookieStore = createCookieStore(initialCookies)
  }

  return cookieStore as StoreApi<CookieState<T>>
}

export const getCookieStore = (): StoreApi<CookieState> => {
  if (!cookieStore) {
    throw new Error(MISSING_COOKIE_STORE_ERROR)
  }

  return cookieStore
}

export const getCookieFromStore = <T = string>(key: string): T | undefined => {
  const store = getCookieStore()
  const cookies = store.getState().cookies as Record<string, any> | undefined
  const cookie = cookies?.[key]

  if (cookie === undefined) {
    return undefined
  }

  return cookie as T
}

export const setCookieInStore = (key: string, value: string): void => {
  const store = getCookieStore()
  store.getState().setCookie(key, value)
}

export const removeCookieFromStore = (key: string): void => {
  const store = getCookieStore()
  store.getState().removeCookie(key)
}
