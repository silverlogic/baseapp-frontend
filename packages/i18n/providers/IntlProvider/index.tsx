'use client'

import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { IntlProvider as ReactIntlProvider } from 'react-intl'

import { getCurrentLocale } from '../../functions/getCurrentLocale'
import { DEFAULT_LOCALE, LANGUAGE_COOKIE_NAME, Locale, SUPPORTED_LOCALES } from '../../types'
import { getMessages } from '../../utils'
import { LocaleUpdateContext } from './context'
import { IntlProviderWrapperProps } from './types'

const IntlProviderWrapper: FC<IntlProviderWrapperProps> = ({
  children,
  locale: initialLocale,
  defaultLocale = DEFAULT_LOCALE,
  additionalMessages,
  initialCookies,
}) => {
  const cookieLocale = useMemo(() => {
    const value = initialCookies?.[LANGUAGE_COOKIE_NAME] as Locale | undefined
    return value && SUPPORTED_LOCALES.includes(value) ? value : undefined
  }, [initialCookies])

  const detectedLocale = initialLocale ?? cookieLocale ?? defaultLocale

  const [locale, setLocale] = useState<Locale>(detectedLocale)
  const cancelDetection = useRef<(() => void) | undefined>(undefined)

  // An in-place switch must not be undone by a detection that was still pending.
  const updateLocale = useCallback((next: Locale) => {
    cancelDetection.current?.()
    setLocale(next)
  }, [])

  const messages = useMemo(
    () => getMessages(locale, additionalMessages?.[locale]),
    [locale, additionalMessages],
  )

  useEffect(() => {
    // Load locale from storage if not provided via props or a supported cookie
    if (initialLocale || cookieLocale) return undefined

    let isStale = false
    const cancel = () => {
      isStale = true
    }
    cancelDetection.current = cancel
    getCurrentLocale(defaultLocale)
      .then((stored) => {
        if (!isStale) setLocale(stored)
      })
      // Keep the default locale if the stored language can't be read.
      .catch(() => undefined)

    // A detection still pending when the props change must not override the newer locale.
    return () => {
      cancel()
      if (cancelDetection.current === cancel) cancelDetection.current = undefined
    }
  }, [initialLocale, cookieLocale, defaultLocale])

  // Follow the prop when it changes, without undoing an in-place switch from `useLocale`.
  useEffect(() => {
    if (initialLocale) {
      setLocale(initialLocale)
    }
  }, [initialLocale])

  return (
    <LocaleUpdateContext.Provider value={updateLocale}>
      <ReactIntlProvider locale={locale} defaultLocale={defaultLocale} messages={messages}>
        {children}
      </ReactIntlProvider>
    </LocaleUpdateContext.Provider>
  )
}

export default IntlProviderWrapper
