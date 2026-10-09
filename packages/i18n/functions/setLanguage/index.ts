import { isMobilePlatform, setCookie } from '@baseapp-frontend/utils'

import { setItemAsync } from 'expo-secure-store'

import { LANGUAGE_COOKIE_NAME } from '../../types'

export const setLanguage = async (language: string, languageKey = LANGUAGE_COOKIE_NAME) => {
  if (isMobilePlatform()) {
    try {
      await setItemAsync(languageKey, language)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to set language:', error)
    }
  } else {
    setCookie(languageKey, language, { path: '/' })
  }
}
