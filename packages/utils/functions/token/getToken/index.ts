import { getItem } from 'expo-secure-store'

import { ACCESS_KEY_NAME } from '../../../constants/jwt'
import type { ServerSideRenderingOption } from '../../../types/server'
import { getCookie } from '../../cookie'

export const getToken = (
  key = ACCESS_KEY_NAME,
  { noSSR = false }: ServerSideRenderingOption = {},
) => {
  if (process.env.EXPO_PUBLIC_PLATFORM === 'mobile') return getItem(key)

  return getCookie<string>(key, { noSSR })
}
