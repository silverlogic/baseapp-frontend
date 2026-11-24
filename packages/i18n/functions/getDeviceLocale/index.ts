import { isMobilePlatform } from '@baseapp-frontend/utils'

import { getLocales } from 'expo-localization'

import { Locale, isSupportedLocale } from '../../types'

const getPreferredLanguages = (): (string | null | undefined)[] => {
  // Hermes has no navigator.language, and the Intl polyfills don't report the device locale.
  if (isMobilePlatform()) {
    return getLocales().map((locale) => locale.languageCode)
  }
  if (typeof navigator === 'undefined') return []
  return navigator.languages?.length ? [...navigator.languages] : [navigator.language]
}

/**
 * The first supported locale in the device's (or browser's) preferred-language list, synchronously.
 * `undefined` on the server and when no preferred language is supported.
 */
export const getDeviceLocale = (): Locale | undefined =>
  getPreferredLanguages()
    .map((language) => language?.split('-')[0])
    .find(isSupportedLocale)
