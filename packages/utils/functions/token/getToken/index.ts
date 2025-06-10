'use client'

import { getItem } from 'expo-secure-store'

import { ACCESS_KEY_NAME } from '../../../constants/jwt'
import { getCookie } from '../../cookie'
import { isMobilePlatform } from '../../os'

export const getToken = (key = ACCESS_KEY_NAME) => {
  if (isMobilePlatform()) {
    const token = getItem(key)
    return token
  }

  const token = getCookie<string>(key)
  return token
}
