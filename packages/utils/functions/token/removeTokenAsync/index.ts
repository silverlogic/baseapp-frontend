import { deleteItemAsync } from 'expo-secure-store'

import { removeCookie } from '../../cookie'

export const removeTokenAsync = async (key: string) => {
  try {
    if (process.env.EXPO_PUBLIC_PLATFORM === 'mobile') {
      await deleteItemAsync(key)
    } else {
      removeCookie(key)
    }
  } catch (error) {
    console.error(`Failed to set token for ${key}:`, error)
  }
}
