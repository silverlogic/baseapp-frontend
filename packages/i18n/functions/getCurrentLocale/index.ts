import { DEFAULT_LOCALE, Locale, SUPPORTED_LOCALES } from '../../types'
import { getLanguage } from '../getLanguage'

/**
 * Get the current locale from storage, then the browser, then `fallback`
 */
export const getCurrentLocale = async (fallback: Locale = DEFAULT_LOCALE): Promise<Locale> => {
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

  return fallback
}
