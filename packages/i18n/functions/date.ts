import { formatDateWithDiffNow, formatRelativeTime } from '@baseapp-frontend/utils'

import { DateTime } from 'luxon'
import { IntlShape } from 'react-intl'

/**
 * Format date using Intl.DateTimeFormat
 * This provides automatic localization based on the current locale
 */
export const formatDateI18n = (
  intl: IntlShape,
  date?: string | Date | null,
  options: Intl.DateTimeFormatOptions = {},
): string => {
  if (!date) return ''

  const dateObj = typeof date === 'string' ? DateTime.fromISO(date).toJSDate() : date

  return intl.formatDate(dateObj, options)
}

/**
 * Format time using Intl.DateTimeFormat
 */
export const formatTimeI18n = (
  intl: IntlShape,
  date?: string | Date | null,
  options: Intl.DateTimeFormatOptions = {},
): string => {
  if (!date) return ''

  const dateObj = typeof date === 'string' ? DateTime.fromISO(date).toJSDate() : date

  return intl.formatTime(dateObj, options)
}

/** Minutes, hours or days ago in the active locale; the date once it is a month old. */
export const formatRelativeTimeI18n = (
  intl: IntlShape,
  date?: string | null,
  reference: DateTime = DateTime.now(),
): string => formatRelativeTime(date, { intl, reference })

/** The time today, Yesterday, then days, weeks or months ago, in the active locale. */
export const formatDateWithDiffNowI18n = (intl: IntlShape, date?: string | null): string =>
  formatDateWithDiffNow(date, { intl })
