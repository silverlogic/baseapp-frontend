import ClientCookies from 'js-cookie'

import type { GetCookieOptions, SetCookieOptions } from './types'

const parseCookie = <T>(cookie: string) => {
  try {
    return JSON.parse(cookie) as T
  } catch {
    return cookie as T
  }
}

export const getCookie = <T>(
  key: string,
  { noSSR = false, parseJSON = false }: GetCookieOptions = {},
) => {
  let cookie
  if (typeof window === typeof undefined && !noSSR) {
    const { cookies: serverCookies } = require('next/headers')
    cookie = serverCookies().get(key)?.value
  } else {
    cookie = ClientCookies.get(key)
  }
  return parseJSON ? parseCookie<T>(cookie as string) : (cookie as T)
}

export const getCookieAsync = async <T>(
  key: string,
  { noSSR = false, parseJSON = false }: GetCookieOptions = {},
) => {
  let cookie
  if (typeof window === typeof undefined && !noSSR) {
    // @ts-ignore
    const { cookies: serverCookies } = await import('next/headers')
    cookie = serverCookies().get(key)?.value
  } else {
    cookie = ClientCookies.get(key)
  }
  return parseJSON ? parseCookie<T>(cookie as string) : (cookie as T)
}

export const setCookie = (
  key: string,
  value: any,
  { stringfyValue = false, ...config }: SetCookieOptions = {},
) => {
  try {
    const formattedValue = stringfyValue ? JSON.stringify(value) : value
    ClientCookies.set(key, formattedValue, config)
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
