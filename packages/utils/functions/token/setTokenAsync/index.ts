import { setItemAsync } from 'expo-secure-store'
import { CookieAttributes } from 'js-cookie'

import { setCookie } from '../../cookie'
import { isMobilePlatform } from '../../os'

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
