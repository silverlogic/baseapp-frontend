import { useCallback, useContext } from 'react'

import { isMobilePlatform } from '@baseapp-frontend/utils'

import { useIntl } from 'react-intl'

import { setLanguage as setLanguageUtil } from '../../functions/setLanguage'
import { Locale } from '../../types'
import { LocaleUpdateContext } from './context'

/**
 * Hook to get current locale and change it
 */
export const useLocale = () => {
  const intl = useIntl()
  const updateLocale = useContext(LocaleUpdateContext)

  const setLocale = useCallback(
    async (newLocale: Locale) => {
      await setLanguageUtil(newLocale)
      // Native has no server render to redo, so switch the provider's locale in place.
      if (isMobilePlatform()) {
        updateLocale?.(newLocale)
        return
      }
      // Reload the page to apply new locale
      if (typeof window !== 'undefined') {
        window.location.reload()
      }
    },
    [updateLocale],
  )

  return {
    locale: intl.locale as Locale,
    setLocale,
  }
}
