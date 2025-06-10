import type { PropsWithChildren } from 'react'

import type { DefaultBaseAppCookieName } from '../../types/cookies'

export type BaseCookies = {
  [key in DefaultBaseAppCookieName]?: string | undefined
}

export type CookieStore<T extends Record<string, any> = {}> = {
  cookies?: BaseCookies & T
}

type CookieFunctions = {
  setCookie: (key: string, value: string) => void
  removeCookie: (key: string) => void
}

export type CookieState<T extends Record<string, any> = {}> = CookieStore<T> & CookieFunctions

export interface CookieProviderProps<T extends Record<string, any> = {}> extends PropsWithChildren {
  initialCookies?: BaseCookies & T
}
