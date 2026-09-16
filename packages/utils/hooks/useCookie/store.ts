// No module-level mutable state: this file runs during SSR of client components, where
// `let` persists across HTTP requests in the Node process. Use the Provider's `useRef`.
// Cross-tree sync uses COOKIE_CHANGE_EVENT (see constants.ts and index.tsx).
import Cookies from 'js-cookie'
import { type StoreApi, createStore } from 'zustand'

import { ACCESS_KEY_NAME, REFRESH_KEY_NAME } from '../../constants/jwt'
import type { BaseCookies, CookieState } from './types'

const getClientSideCookies = (): BaseCookies => ({
  [ACCESS_KEY_NAME]: Cookies.get(ACCESS_KEY_NAME),
  [REFRESH_KEY_NAME]: Cookies.get(REFRESH_KEY_NAME),
})

const createCookieStore = <T extends Record<string, any> = {}>(
  initialCookies?: BaseCookies & T,
): StoreApi<CookieState<T>> => {
  // If no initialCookies provided, try to get them from client-side cookies
  const cookiesToUse = initialCookies || (getClientSideCookies() as BaseCookies & T)

  return createStore<CookieState<T>>()((set) => ({
    cookies: cookiesToUse,
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
}

export const initializeCookieStore = <T extends Record<string, any> = {}>(
  initialCookies?: BaseCookies & T,
): StoreApi<CookieState<T>> => createCookieStore(initialCookies)
