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

  // Try the browser language, then the device locale (React Native has no navigator.language)
  const deviceLanguage =
    (typeof navigator !== 'undefined' && navigator.language) ||
    Intl.DateTimeFormat().resolvedOptions().locale
  const deviceLocale = deviceLanguage?.split('-')[0] as Locale
  if (SUPPORTED_LOCALES.includes(deviceLocale)) {
    return deviceLocale
  }

  return fallback
}
