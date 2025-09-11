'use client'

import { setItemAsync } from 'expo-secure-store'

import { setCookie } from '../../cookie'
import { isMobilePlatform } from '../../os'

// TODO: temporary hardcoding CookieAttributes, having problems with importing from js-cookie
interface CookieAttributes {
  /**
   * Define when the cookie will be removed. Value can be a Number
   * which will be interpreted as days from time of creation or a
   * Date instance. If omitted, the cookie becomes a session cookie.
   */
  expires?: number | Date | undefined

  /**
   * Define the path where the cookie is available. Defaults to '/'
   */
  path?: string | undefined

  /**
   * Define the domain where the cookie is available. Defaults to
   * the domain of the page where the cookie was created.
   */
  domain?: string | undefined

  /**
   * A Boolean indicating if the cookie transmission requires a
   * secure protocol (https). Defaults to false.
   */
  secure?: boolean | undefined

  /**
   * Asserts that a cookie must not be sent with cross-origin requests,
   * providing some protection against cross-site request forgery
   * attacks (CSRF)
   */
  sameSite?: 'strict' | 'Strict' | 'lax' | 'Lax' | 'none' | 'None' | undefined

  /**
   * An attribute which will be serialized, conformably to RFC 6265
   * section 5.2.
   */
  [property: string]: any
}

export const setTokenAsync = async (key: string, value: string, config?: CookieAttributes) => {
  try {
    if (isMobilePlatform()) {
      await setItemAsync(key, value)
    } else {
      setCookie(key, value, config)
    }
  } catch (error) {
    console.error(`Failed to set token for ${key}:`, error)
  }
}
