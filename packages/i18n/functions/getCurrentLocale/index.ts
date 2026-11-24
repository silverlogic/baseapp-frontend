import { DEFAULT_LOCALE, Locale, isSupportedLocale } from '../../types'
import { getDeviceLocale } from '../getDeviceLocale'
import { getLanguage } from '../getLanguage'

/**
 * Get the current locale from storage, then the browser or device, then `fallback`
 */
export const getCurrentLocale = async (fallback: Locale = DEFAULT_LOCALE): Promise<Locale> => {
  const storedLanguage = await getLanguage()

  if (isSupportedLocale(storedLanguage)) {
    return storedLanguage
  }

  // Only a browser or device knows the user's language; a server render keeps `fallback`.
  if (typeof window === 'undefined') {
    return fallback
  }

  return getDeviceLocale() ?? fallback
}
