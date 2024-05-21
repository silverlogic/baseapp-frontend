import ClientCookies, { CookieAttributes } from 'js-cookie'

import { GetCookieOptions } from './types'

const parseCookie = <T>(cookie: string) => {
  try {
    return JSON.parse(cookie) as T
  } catch {
    return cookie as T
  }
}

export const getCookie = <T>(
  key: string,
  { noSSR = false, parseJSON = true }: GetCookieOptions = {},
) => {
  let cookie
  if (typeof window === typeof undefined && !noSSR) {
    const { cookies: serverCookies } = require('next/headers')
    cookie = serverCookies().get(key)?.value
  } else {
    cookie = ClientCookies.get(key)
  }
  return parseJSON ? parseCookie<T>(cookie) : (cookie as T)
}

export const setCookie = (key: string, value: any, config?: CookieAttributes) => {
  try {
    ClientCookies.set(key, JSON.stringify(value), config)
  } catch (error) {
    console.error(error)
  }
}

export const removeCookie = (key: string) => {
  try {
    ClientCookies.remove(key)
  } catch (error) {
    console.error(error)
  }
}
