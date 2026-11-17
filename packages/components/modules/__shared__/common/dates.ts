import { DateTime } from 'luxon'
import { IntlShape } from 'react-intl'

import { TIMESTAMP_MESSAGES } from './constants'

const ABSOLUTE_DATE: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
}
const TIME_OF_DAY: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit' }

const parseDate = (date?: string | null) => {
  const dateTime = DateTime.fromISO(date ?? '')
  return dateTime.isValid ? dateTime : null
}

const calendarDaysAgo = (date: DateTime, now: DateTime) =>
  Math.round(now.startOf('day').diff(date.startOf('day'), 'days').days)

export const formatAbsoluteDate = (intl: IntlShape, date: DateTime) =>
  intl.formatDate(date.toJSDate(), ABSOLUTE_DATE)

export const formatTimeOfDay = (intl: IntlShape, date: DateTime) =>
  intl.formatTime(date.toJSDate(), TIME_OF_DAY)

/** Day header for grouped messages: Today, Yesterday, else the date. */
export const formatDayLabel = (intl: IntlShape, date?: string | null, now = DateTime.now()) => {
  const dateTime = parseDate(date)
  if (!dateTime) return ''

  const days = calendarDaysAgo(dateTime, now)
  if (days === 0) return intl.formatMessage(TIMESTAMP_MESSAGES.today)
  if (days === 1) return intl.formatMessage(TIMESTAMP_MESSAGES.yesterday)
  return formatAbsoluteDate(intl, dateTime)
}

/** Comment timestamp: Today, Yesterday, days ago within a week, else the date. */
export const formatTimestamp = (intl: IntlShape, date?: string | null, now = DateTime.now()) => {
  const dateTime = parseDate(date)
  if (!dateTime) return ''

  const days = calendarDaysAgo(dateTime, now)
  if (days === 0) return intl.formatMessage(TIMESTAMP_MESSAGES.today)
  if (days === 1) return intl.formatMessage(TIMESTAMP_MESSAGES.yesterday)
  if (days > 1 && days <= 7) return intl.formatMessage(TIMESTAMP_MESSAGES.daysAgo, { count: days })
  return formatAbsoluteDate(intl, dateTime)
}

/** Chat list: the time for today, Yesterday, then days, weeks or months ago. */
export const formatChatRoomDate = (intl: IntlShape, date?: string | null, now = DateTime.now()) => {
  const dateTime = parseDate(date)
  if (!dateTime) return ''

  const days = calendarDaysAgo(dateTime, now)
  if (days === 0) return formatTimeOfDay(intl, dateTime)
  if (days === 1) return intl.formatMessage(TIMESTAMP_MESSAGES.yesterday)

  const diff = now.diff(dateTime, ['months', 'weeks', 'days'])
  if (diff.months >= 1) {
    return intl.formatMessage(TIMESTAMP_MESSAGES.monthsAgo, { count: Math.round(diff.months) })
  }
  if (diff.weeks >= 1) {
    return intl.formatMessage(TIMESTAMP_MESSAGES.weeksAgo, { count: Math.round(diff.weeks) })
  }
  if (diff.days >= 1) {
    return intl.formatMessage(TIMESTAMP_MESSAGES.daysAgo, { count: Math.round(diff.days) })
  }
  return formatAbsoluteDate(intl, dateTime)
}

/** Notification age: minutes, hours or days ago, and the date once it is a month old. */
export const formatRelativeTime = (intl: IntlShape, date?: string | null, now = DateTime.now()) => {
  const dateTime = parseDate(date)
  if (!dateTime) return '-'

  const diff = now.diff(dateTime, ['months', 'days', 'hours', 'minutes'])
  if (dateTime > now || diff.months >= 1) return formatAbsoluteDate(intl, dateTime)
  if (diff.days >= 1) {
    return intl.formatMessage(TIMESTAMP_MESSAGES.daysAgo, { count: Math.floor(diff.days) })
  }
  if (diff.hours >= 1) {
    return intl.formatMessage(TIMESTAMP_MESSAGES.hoursAgo, { count: Math.floor(diff.hours) })
  }
  return intl.formatMessage(TIMESTAMP_MESSAGES.minutesAgo, {
    count: Math.max(1, Math.floor(diff.minutes)),
  })
}
