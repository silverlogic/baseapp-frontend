import { setItemAsync } from 'expo-secure-store'
import { CookieAttributes } from 'js-cookie'

import { setCookie } from '../../cookie'

export const setTokenAsync = async (key: string, value: string, config?: CookieAttributes) => {
  try {
    if (process.env.EXPO_PUBLIC_PLATFORM === 'mobile') {
      await setItemAsync(key, value)
    } else {
      setCookie(key, value, config)
    }
  } catch (error) {
    console.error(`Failed to set token for ${key}:`, error)
  }
}
