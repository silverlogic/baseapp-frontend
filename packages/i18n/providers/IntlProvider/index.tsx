'use client'

import { FC, useEffect, useMemo, useState } from 'react'

import { IntlProvider as ReactIntlProvider } from 'react-intl'

import { getCurrentLocale } from '../../functions/getCurrentLocale'
import { DEFAULT_LOCALE, LANGUAGE_COOKIE_NAME, Locale, SUPPORTED_LOCALES } from '../../types'
import { getMessages } from '../../utils'
import { IntlProviderWrapperProps } from './types'

// Dynamically import app-specific messages
let getAppMessages: ((locale: Locale) => Record<string, string>) | null = null

try {
  // Try to import from the app's i18n directory
  // This will be resolved by the build tool (webpack/next.js)
  const i18nModule = require('i18n')
  getAppMessages = i18nModule.getWebMessages || null
} catch (error) {
  // No app-specific messages available, will use base messages only
  getAppMessages = null
}

const IntlProviderWrapper: FC<IntlProviderWrapperProps> = ({
  children,
  locale: initialLocale,
  defaultLocale = DEFAULT_LOCALE,
  additionalMessages,
  initialCookies,
}) => {
  // Detect locale from cookies or use provided locale
  const detectedLocale = useMemo(() => {
    if (initialLocale) return initialLocale

    // Try to get from cookies (server-side)
    if (initialCookies) {
      const cookieLocale = initialCookies[LANGUAGE_COOKIE_NAME] as Locale | undefined
      if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)) {
        return cookieLocale
      }
    }

    return defaultLocale
  }, [initialLocale, initialCookies, defaultLocale])

  const [locale, setLocale] = useState<Locale>(detectedLocale)

  // Get additional messages based on locale (from app or prop)
  const mergedAdditionalMessages = useMemo(() => {
    // Prefer app-specific messages loader if available
    if (getAppMessages) {
      return getAppMessages(locale)
    }
    // Fall back to prop-provided messages
    return additionalMessages
  }, [locale, additionalMessages])

  const [messages, setMessages] = useState<Record<string, string>>(
    getMessages(locale, mergedAdditionalMessages),
  )

  useEffect(() => {
    // Load locale from storage if not provided via props or cookies
    if (!initialLocale && !initialCookies) {
      getCurrentLocale().then((currentLocale) => {
        setLocale(currentLocale)
        const newAdditionalMessages = getAppMessages
          ? getAppMessages(currentLocale)
          : additionalMessages
        setMessages(getMessages(currentLocale, newAdditionalMessages))
      })
    }
  }, [initialLocale, initialCookies, additionalMessages])

  useEffect(() => {
    if (initialLocale && initialLocale !== locale) {
      setLocale(initialLocale)
      const newAdditionalMessages = getAppMessages
        ? getAppMessages(initialLocale)
        : additionalMessages
      setMessages(getMessages(initialLocale, newAdditionalMessages))
    }
  }, [initialLocale, locale, additionalMessages])

  return (
    <ReactIntlProvider locale={locale} defaultLocale={defaultLocale} messages={messages}>
      {children}
    </ReactIntlProvider>
  )
}

export default IntlProviderWrapper
