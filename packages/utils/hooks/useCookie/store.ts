// Do not introduce module-level mutable state here. This file runs during SSR of client
// components; in Next.js App Router, module-level `let` persists across HTTP requests in
// a long-running Node process and leaks user data between sessions. Per-request
// isolation comes from the Provider's `useRef`. Cross-tree sync between imperative
// setCookie/removeCookie callers and `useCookie` consumers happens via the
// `COOKIE_CHANGE_EVENT` CustomEvent — see `constants.ts` and `index.tsx`.
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
