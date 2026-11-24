'use client'

import { FC, useCallback, useEffect, useMemo, useState } from 'react'

import { isMobilePlatform } from '@baseapp-frontend/utils'

import { useLocales } from 'expo-localization'
import { IntlProvider as ReactIntlProvider } from 'react-intl'

import { getCurrentLocale } from '../../functions/getCurrentLocale'
import { getInitialLocale } from '../../functions/getInitialLocale'
import { DEFAULT_LOCALE, LANGUAGE_COOKIE_NAME, Locale, isSupportedLocale } from '../../types'
import { getMessages } from '../../utils'
import { LocaleUpdateContext } from './context'
import { IntlProviderWrapperProps } from './types'

// Rendered on native only: `useLocales` re-renders when the OS (per-app) language changes.
const DeviceLocaleWatcher: FC<{ onChange: () => void }> = ({ onChange }) => {
  const locales = useLocales()
  useEffect(() => {
    onChange()
  }, [locales, onChange])
  return null
}

const IntlProviderWrapper: FC<IntlProviderWrapperProps> = ({
  children,
  locale: initialLocale,
  defaultLocale = DEFAULT_LOCALE,
  additionalMessages,
  initialCookies,
}) => {
  const cookieLocale = useMemo(() => {
    const value = initialCookies?.[LANGUAGE_COOKIE_NAME]
    return isSupportedLocale(value) ? value : undefined
  }, [initialCookies])

  // Native reads the stored and device language synchronously, so the first render already uses it.
  const [locale, setLocale] = useState<Locale>(
    () => initialLocale ?? cookieLocale ?? getInitialLocale(defaultLocale),
  )
  const followsDevice = !initialLocale && !cookieLocale && isMobilePlatform()

  // A stored language still wins: `getInitialLocale` reads it before the device.
  const syncWithDevice = useCallback(
    () => setLocale(getInitialLocale(defaultLocale)),
    [defaultLocale],
  )

  const messages = useMemo(
    () => getMessages(locale, additionalMessages?.[locale]),
    [locale, additionalMessages],
  )

  useEffect(() => {
    // On web the stored language is read after mount when neither the prop nor a supported cookie set it.
    if (initialLocale || cookieLocale || isMobilePlatform()) return undefined

    let isStale = false
    getCurrentLocale(defaultLocale)
      .then((stored) => {
        if (!isStale) setLocale(stored)
      })
      // Keep the default locale if the stored language can't be read.
      .catch(() => undefined)

    return () => {
      isStale = true
    }
  }, [initialLocale, cookieLocale, defaultLocale])

  // Follow the prop when it changes, without undoing an in-place switch from `useLocale`.
  useEffect(() => {
    if (initialLocale) {
      setLocale(initialLocale)
    }
  }, [initialLocale])

  return (
    <LocaleUpdateContext.Provider value={setLocale}>
      <ReactIntlProvider locale={locale} defaultLocale={defaultLocale} messages={messages}>
        {followsDevice && <DeviceLocaleWatcher onChange={syncWithDevice} />}
        {children}
      </ReactIntlProvider>
    </LocaleUpdateContext.Provider>
  )
}

export default IntlProviderWrapper
