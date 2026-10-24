import { getItem } from 'expo-secure-store'

import { LANGUAGE_COOKIE_NAME } from '../../../constants/cookie'
import { getCookie } from '../../cookie'
import { isMobilePlatform } from '../../os'

export const getLanguage = async (languageKey = LANGUAGE_COOKIE_NAME) => {
  if (isMobilePlatform()) {
    return getItem(languageKey)
  }
  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    return cookieStore.get(languageKey)?.value
  }
  return getCookie<string>(languageKey)
}
