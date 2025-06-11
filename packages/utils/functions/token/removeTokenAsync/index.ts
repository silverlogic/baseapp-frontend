'use client'

import { deleteItemAsync } from 'expo-secure-store'

import { removeCookie } from '../../cookie'
import { isMobilePlatform } from '../../os'

export const removeTokenAsync = async (key: string) => {
  try {
    if (isMobilePlatform()) {
      await deleteItemAsync(key)
    } else {
      removeCookie(key)
    }
  } catch (error) {
    console.error(`Failed to set token for ${key}:`, error)
  }
}
