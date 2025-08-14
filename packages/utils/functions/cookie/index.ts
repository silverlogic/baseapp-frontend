'use client'

import ClientCookies from 'js-cookie'

import {
  getCookieFromStore,
  removeCookieFromStore,
  setCookieInStore,
} from '../../hooks/useCookie/store'
import { DefaultBaseAppCookieName } from '../../types/cookies'
import { parseString } from '../string'
import type { GetCookieOptions, SetCookieOptions } from './types'

export const getCookie = <T = string>(
  key: DefaultBaseAppCookieName | (string & {}),
  { parseJSON = false }: GetCookieOptions = {},
): T | undefined => {
  const cookieFromStore = getCookieFromStore<T>(key)
  const cookie = ClientCookies.get(key as string) ?? cookieFromStore

  return parseJSON ? parseString<T>(cookie as string) : (cookie as T)
}

export const setCookie = (
  key: string,
  value: any,
  { stringfyValue = false, ...config }: SetCookieOptions = {},
) => {
  try {
    const formattedValue = stringfyValue ? JSON.stringify(value) : value
    ClientCookies.set(key, formattedValue, config)
    setCookieInStore(key, formattedValue)
  } catch (error) {
    console.error(error)
  }
}

export const removeCookie = (key: string) => {
  try {
    ClientCookies.remove(key)
    removeCookieFromStore(key)
  } catch (error) {
    console.error(error)
  }
}
