import { IntlShape } from 'react-intl'

import { Locale } from './types'

/**
 * Get utils-specific messages for a locale
 * @deprecated Use loadLocales with '@baseapp-frontend/utils/locales' instead
 * This function is kept for backward compatibility but should not be used in new code
 */
export const getUtilsMessages = (
  _locale: Locale,
  additionalMessages?: Record<string, string>,
): Record<string, string> => {
  // eslint-disable-next-line no-console
  console.warn(
    'getUtilsMessages is deprecated. Use loadLocales with "@baseapp-frontend/utils/locales" instead.',
  )
  // Return only additional messages or empty object to avoid circular dependency
  // Users should migrate to the new loadLocales system
  return additionalMessages || {}
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
