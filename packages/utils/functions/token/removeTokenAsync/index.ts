'use client'

import { deleteItemAsync } from 'expo-secure-store'

import { removeCookie } from '../../cookie'
import { isMobilePlatform } from '../../os'

export const removeTokenAsync = async (key: string) => {
  try {
    if (isMobilePlatform()) {
      await deleteItemAsync(key)
    } else {
      const cookieDomain = process.env.NEXT_PUBLIC_AUTH_COOKIE_DOMAIN
      removeCookie(key, cookieDomain ? { domain: cookieDomain } : undefined)
    }
  } catch (error) {
    console.error(`Failed to set token for ${key}:`, error)
  }
}
