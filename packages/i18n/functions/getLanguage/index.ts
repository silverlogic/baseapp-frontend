import { getItem } from 'expo-secure-store'

import { getCookie, isMobilePlatform } from '@baseapp-frontend/utils'

import { LANGUAGE_COOKIE_NAME } from '../../types'

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
