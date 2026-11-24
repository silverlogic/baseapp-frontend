import { isMobilePlatform } from '@baseapp-frontend/utils'

import { getItem } from 'expo-secure-store'

import { DEFAULT_LOCALE, LANGUAGE_COOKIE_NAME, Locale, isSupportedLocale } from '../../types'
import { getDeviceLocale } from '../getDeviceLocale'

const getStoredLocale = (languageKey: string): Locale | undefined => {
  try {
    const stored = getItem(languageKey)
    return isSupportedLocale(stored) ? stored : undefined
  } catch {
    return undefined
  }
}

/**
 * Synchronous `getCurrentLocale` for the first render on native, where the secure store and the
 * device locale can both be read without awaiting. On web the server render owns the first locale
 * (via the language cookie), so this returns `fallback` there.
 */
export const getInitialLocale = (
  fallback: Locale = DEFAULT_LOCALE,
  languageKey = LANGUAGE_COOKIE_NAME,
): Locale => {
  if (!isMobilePlatform()) return fallback
  return getStoredLocale(languageKey) ?? getDeviceLocale() ?? fallback
}
