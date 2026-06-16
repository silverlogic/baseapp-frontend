import { getLanguage } from '../getLanguage'
import { DEFAULT_LOCALE, Locale, SUPPORTED_LOCALES } from '../../types'

/**
 * Get the current locale from storage or default
 */
export const getCurrentLocale = async (): Promise<Locale> => {
  const storedLanguage = await getLanguage()

  if (storedLanguage && SUPPORTED_LOCALES.includes(storedLanguage as Locale)) {
    return storedLanguage as Locale
  }

  // Try to get from browser
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language.split('-')[0] as Locale
    if (SUPPORTED_LOCALES.includes(browserLang)) {
      return browserLang
    }
  }

  return DEFAULT_LOCALE
}
