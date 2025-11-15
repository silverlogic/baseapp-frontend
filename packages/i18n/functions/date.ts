import { DateTime } from 'luxon'
import { IntlShape } from 'react-intl'

import { formatRelativeTimeWithIntl } from '../utilsMessages'

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

/**
 * Format relative time (e.g., "2 hours ago") with i18n support
 */
export const formatRelativeTimeI18n = (
  intl: IntlShape,
  date?: string | null,
  reference: DateTime = DateTime.now(),
): string => {
  if (!date) return '-'

  const dateFromApi = DateTime.fromISO(date)

  const diff = reference.diff(dateFromApi, ['months', 'weeks', 'days', 'hours', 'minutes'])

  const minutesDiff = Math.floor(diff.minutes)
  const hoursDiff = Math.floor(diff.hours)
  const daysDiff = Math.floor(diff.days)
  const weeksDiff = Math.floor(diff.weeks)
  const monthsDiff = Math.floor(diff.months)

  return formatRelativeTimeWithIntl(intl, minutesDiff, hoursDiff, daysDiff, weeksDiff, monthsDiff)
}

/**
 * Format date with custom pattern based on distance from now
 * Shows "Today", "Yesterday", or relative time, or formatted date
 */
export const formatDateWithDiffNowI18n = (intl: IntlShape, date?: string | null): string => {
  if (!date) return ''

  const dateTime = DateTime.fromISO(date)
  const now = DateTime.now()

  const daysDiff = Math.floor(now.diff(dateTime, 'days').days)

  if (daysDiff === 0) {
    return intl.formatMessage({ id: 'date.today' })
  }

  if (daysDiff === 1) {
    return intl.formatMessage({ id: 'date.yesterday' })
  }

  const monthsDiff = Math.floor(now.diff(dateTime, 'months').months)
  const weeksDiff = Math.floor(now.diff(dateTime, 'weeks').weeks)

  if (monthsDiff > 0) {
    return intl.formatMessage({ id: 'time.monthsAgo' }, { count: monthsDiff })
  }

  if (weeksDiff > 0) {
    return intl.formatMessage({ id: 'time.weeksAgo' }, { count: weeksDiff })
  }

  if (daysDiff > 0) {
    return intl.formatMessage({ id: 'time.daysAgo' }, { count: daysDiff })
  }

  return intl.formatDate(dateTime.toJSDate(), { month: 'short', day: 'numeric', year: 'numeric' })
}
