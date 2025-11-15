import { useCallback } from 'react'

import { useIntl } from 'react-intl'

import { setLanguage as setLanguageUtil } from '../../functions/setLanguage'
import { Locale } from '../../types'

/**
 * Hook to get current locale and change it
 */
export const useLocale = () => {
  const intl = useIntl()

  const setLocale = useCallback(async (newLocale: Locale) => {
    await setLanguageUtil(newLocale)
    // Reload the page to apply new locale
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }, [])

  return {
    locale: intl.locale as Locale,
    setLocale,
  }
}
