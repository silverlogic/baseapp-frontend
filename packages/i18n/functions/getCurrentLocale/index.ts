import { DEFAULT_LOCALE, Locale, SUPPORTED_LOCALES } from '../../types'
import { getLanguage } from '../getLanguage'

/**
 * Get the current locale from storage, then the browser or device, then `fallback`
 */
export const getCurrentLocale = async (fallback: Locale = DEFAULT_LOCALE): Promise<Locale> => {
  const storedLanguage = await getLanguage()

  if (storedLanguage && SUPPORTED_LOCALES.includes(storedLanguage as Locale)) {
    return storedLanguage as Locale
  }

  // Only a browser or device knows the user's language; a server render keeps `fallback`.
  if (typeof window === 'undefined') {
    return fallback
  }

  // React Native has no navigator.language, so fall back to the device locale
  const deviceLanguage = navigator.language || Intl.DateTimeFormat().resolvedOptions().locale
  const deviceLocale = deviceLanguage?.split('-')[0] as Locale
  if (SUPPORTED_LOCALES.includes(deviceLocale)) {
    return deviceLocale
  }

  return fallback
}
