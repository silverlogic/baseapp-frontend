import { getItem } from 'expo-secure-store'

import { ACCESS_KEY_NAME } from '../../../constants/jwt'
import type { ServerSideRenderingOption } from '../../../types/server'
import { getCookie } from '../../cookie'
import { isMobilePlatform } from '../../os'

export const getToken = (
  key = ACCESS_KEY_NAME,
  { noSSR = false }: ServerSideRenderingOption = {},
) => {
  if (isMobilePlatform()) return getItem(key)

  return getCookie<string>(key, { noSSR })
}
