import { IntlShape } from 'react-intl'

import { DEFAULT_LOCALE, Locale } from './types'

/**
 * Get utils-specific messages for a locale
 * @deprecated Use loadLocales with registered packages instead
 */
export const getUtilsMessages = (
  locale: Locale,
  additionalMessages?: Record<string, string>,
): Record<string, string> => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const messages: Record<Locale, Record<string, string>> = {
    en: require('@baseapp-frontend/utils/locales/en.json'),
    es: require('@baseapp-frontend/utils/locales/es.json'),
    pt: require('@baseapp-frontend/utils/locales/pt.json'),
  }

  const baseMessages = messages[locale] || messages[DEFAULT_LOCALE]

  // Merge with additional messages if provided
  return additionalMessages ? { ...baseMessages, ...additionalMessages } : baseMessages
}

/**
 * Format relative time using intl
 */
export const formatRelativeTimeWithIntl = (
  intl: IntlShape,
  minutesDiff: number,
  hoursDiff: number,
  daysDiff: number,
  weeksDiff: number,
  monthsDiff: number,
): string => {
  if (monthsDiff >= 1) {
    return intl.formatMessage({ id: 'utils.time.monthsAgo' }, { count: monthsDiff })
  }

  if (weeksDiff >= 1) {
    return intl.formatMessage({ id: 'utils.time.weeksAgo' }, { count: weeksDiff })
  }

  if (daysDiff >= 1) {
    return intl.formatMessage({ id: 'utils.time.daysAgo' }, { count: daysDiff })
  }

  if (hoursDiff >= 1) {
    return intl.formatMessage({ id: 'utils.time.hoursAgo' }, { count: hoursDiff })
  }

  return intl.formatMessage({ id: 'utils.time.minutesAgo' }, { count: minutesDiff || 1 })
}
