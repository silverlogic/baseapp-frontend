'use client'

import ClientCookies from 'js-cookie'

import { COOKIE_CHANGE_EVENT, type CookieChangeEventDetail } from '../../hooks/useCookie/constants'
import { DefaultBaseAppCookieName } from '../../types/cookies'
import { parseString } from '../string'
import type { GetCookieOptions, SetCookieOptions } from './types'

const dispatchCookieChange = (detail: CookieChangeEventDetail) => {
  if (typeof window === 'undefined') return

  // window covers the dispatching tab; BroadcastChannel covers other tabs (it does not
  // deliver to the posting context). Per-call open/close to avoid module-level state.
  window.dispatchEvent(new CustomEvent<CookieChangeEventDetail>(COOKIE_CHANGE_EVENT, { detail }))
  if (typeof BroadcastChannel !== 'undefined') {
    const channel = new BroadcastChannel(COOKIE_CHANGE_EVENT)
    channel.postMessage(detail)
    channel.close()
  }
}

export const getCookie = <T = string>(
  key: DefaultBaseAppCookieName | (string & {}),
  { parseJSON = false }: GetCookieOptions = {},
): T | undefined => {
  const cookie = ClientCookies.get(key as string)
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
    dispatchCookieChange({ type: 'set', key, value: formattedValue })
  } catch (error) {
    console.error(error)
  }
}

export const removeCookie = (key: string) => {
  try {
    ClientCookies.remove(key)
    dispatchCookieChange({ type: 'remove', key })
  } catch (error) {
    console.error(error)
  }
}
