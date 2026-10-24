'use client'

import { FC, useEffect, useMemo, useState } from 'react'

import { IntlProvider as ReactIntlProvider } from 'react-intl'

import { getCurrentLocale } from '../../functions/getCurrentLocale'
import { DEFAULT_LOCALE, LANGUAGE_COOKIE_NAME, Locale, SUPPORTED_LOCALES } from '../../types'
import { getMessages } from '../../utils'
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

  const messages = useMemo(
    () => getMessages(locale, additionalMessages),
    [locale, additionalMessages],
  )

  useEffect(() => {
    // Load locale from storage if not provided via props or a supported cookie
    if (!initialLocale && !cookieLocale) {
      getCurrentLocale()
        .then(setLocale)
        // Keep the default locale if the stored language can't be read.
        .catch(() => undefined)
    }
  }, [initialLocale, cookieLocale])

  useEffect(() => {
    if (initialLocale && initialLocale !== locale) {
      setLocale(initialLocale)
    }
  }, [initialLocale, locale])

  return (
    <ReactIntlProvider locale={locale} defaultLocale={defaultLocale} messages={messages}>
      {children}
    </ReactIntlProvider>
  )
}

export default IntlProviderWrapper
