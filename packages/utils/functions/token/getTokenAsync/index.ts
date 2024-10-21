import { getItemAsync } from 'expo-secure-store'

import { ACCESS_KEY_NAME } from '../../../constants/jwt'
import type { ServerSideRenderingOption } from '../../../types/server'
import { getCookieAsync } from '../../cookie'

export const getTokenAsync = async (
  key = ACCESS_KEY_NAME,
  { noSSR = false }: ServerSideRenderingOption = {},
) => {
  if (process.env.EXPO_PUBLIC_PLATFORM === 'mobile') {
    const token = await getItemAsync(key)
    return token
  }

  const token = await getCookieAsync<string>(key, { noSSR })
  return token
}
