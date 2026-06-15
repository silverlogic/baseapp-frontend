'use client'

import { deleteItemAsync } from 'expo-secure-store'

import { emitCookieChange } from '../../../hooks/useCookie/emitter'
import { removeCookie } from '../../cookie'
import { isMobilePlatform } from '../../os'

export const removeTokenAsync = async (key: string) => {
  try {
    if (isMobilePlatform()) {
      await deleteItemAsync(key)
      // Bridge the secure-store delete into the in-tree CookieProvider so
      // logged-out state propagates immediately on mobile.
      emitCookieChange({ type: 'remove', key })
    } else {
      const cookieDomain = process.env.NEXT_PUBLIC_AUTH_COOKIE_DOMAIN
      if (cookieDomain) {
        removeCookie(key, { domain: cookieDomain })
      } else {
        removeCookie(key)
      }
    }
  } catch (error) {
    console.error(`Failed to set token for ${key}:`, error)
  }
}
