import { DateTime } from 'luxon'
import type { IntlShape, MessageDescriptor } from 'react-intl'

import {
  DATE_FORMAT,
  DATE_MESSAGES,
  INTL_DATE_FORMAT,
  INTL_TIME_FORMAT,
  TIME_FORMAT,
} from '../../constants/date'
import type {
  DateFormat,
  FormatDateFromApiOptions,
  FormatDateOptions,
  FormatDateToApiOptions,
  FormatRelativeTimeOptions,
  RelativeDateOptions,
  TimeFormat,
} from '../../types/date'

export const formatDate = (
  date?: string | DateTime | null,
  { toFormat = DATE_FORMAT[0], fromFormat = DATE_FORMAT.api }: FormatDateOptions = {},
) => {
  if (!date) return ''
  if (date instanceof DateTime) return date.toFormat(toFormat)
  return DateTime.fromFormat(date, fromFormat).toFormat(toFormat)
}

export const formatDateFromApi = (
  date?: string | null,
  { toFormat = DATE_FORMAT[0] }: FormatDateFromApiOptions = {},
) => {
  if (!date) return ''
  return DateTime.fromISO(date).toFormat(toFormat)
}

export const formatDateToApi = (
  date?: string | DateTime | null,
  { fromFormat = DATE_FORMAT[0] }: FormatDateToApiOptions = {},
) => formatDate(date, { toFormat: DATE_FORMAT.api, fromFormat })

const parseIso = (date?: string | null) => {
  const dateTime = DateTime.fromISO(date ?? '')
  return dateTime.isValid ? dateTime : null
}

// Calendar days are counted in the zone the intl formatters display, not the runtime zone.
const inDisplayZone = (date: DateTime, intl?: IntlShape) =>
  intl?.timeZone ? date.setZone(intl.timeZone) : date

const calendarDaysBefore = (date: DateTime, reference: DateTime, intl?: IntlShape) =>
  Math.round(
    inDisplayZone(reference, intl)
      .startOf('day')
      .diff(inDisplayZone(date, intl).startOf('day'), 'days').days,
  )

const absoluteDate = (
  date: DateTime,
  intl?: IntlShape,
  toFormat: DateFormat | TimeFormat = DATE_FORMAT[2],
) => (intl ? intl.formatDate(date.toJSDate(), INTL_DATE_FORMAT.medium) : date.toFormat(toFormat))

const timeOfDay = (date: DateTime, intl?: IntlShape) =>
  intl ? intl.formatTime(date.toJSDate(), INTL_TIME_FORMAT.short) : date.toFormat(TIME_FORMAT[2])

const todayLabel = (intl?: IntlShape) => (intl ? intl.formatMessage(DATE_MESSAGES.today) : 'Today')

const yesterdayLabel = (intl?: IntlShape) =>
  intl ? intl.formatMessage(DATE_MESSAGES.yesterday) : 'Yesterday'

const agoLabel = (descriptor: MessageDescriptor, unit: string, count: number, intl?: IntlShape) =>
  intl ? intl.formatMessage(descriptor, { count }) : `${count} ${unit}${count === 1 ? '' : 's'} ago`

/** Minutes, hours or days ago; the date once it is a month old or in the future. */
export const formatRelativeTime = (
  date?: string | null,
  { reference = DateTime.now(), toFormat = DATE_FORMAT[2], intl }: FormatRelativeTimeOptions = {},
) => {
  const dateFromApi = parseIso(date)
  if (!dateFromApi) return '-'
  if (dateFromApi > reference) return absoluteDate(dateFromApi, intl, toFormat)

  const diff = reference.diff(dateFromApi, ['minutes', 'hours', 'days', 'months']).toObject()
  const minutesDiff = diff.minutes ?? 0
  const hoursDiff = diff.hours ?? 0
  const daysDiff = diff.days ?? 0
  const monthsDiff = diff.months ?? 0

  if (monthsDiff >= 1) return absoluteDate(dateFromApi, intl, toFormat)
  if (daysDiff < 1) {
    if (hoursDiff >= 1) {
      return agoLabel(DATE_MESSAGES.hoursAgo, 'hour', Math.max(1, Math.floor(hoursDiff)), intl)
    }
    return agoLabel(DATE_MESSAGES.minutesAgo, 'minute', Math.max(1, Math.floor(minutesDiff)), intl)
  }
  return agoLabel(DATE_MESSAGES.daysAgo, 'day', Math.max(1, Math.floor(daysDiff)), intl)
}

export const isToday = (
  date: string,
  { reference = DateTime.now(), intl }: RelativeDateOptions = {},
) => {
  const dateTime = parseIso(date)
  return !!dateTime && calendarDaysBefore(dateTime, reference, intl) === 0
}

export const isYesterday = (
  date: string,
  { reference = DateTime.now(), intl }: RelativeDateOptions = {},
) => {
  const dateTime = parseIso(date)
  return !!dateTime && calendarDaysBefore(dateTime, reference, intl) === 1
}

export const datesDontHaveSameDay = (date1: string, date2: string) => {
  if (!date1 || !date2) return true

  const dt1 = DateTime.fromISO(date1)
  const dt2 = DateTime.fromISO(date2)

  if (!dt1.isValid || !dt2.isValid) return true

  return !dt1.hasSame(dt2, 'day')
}

/** Chat list style: the time today, Yesterday, then days, weeks or months ago, else the date. */
export const formatDateWithDiffNow = (
  date?: string | null,
  { reference = DateTime.now(), intl }: RelativeDateOptions = {},
) => {
  const dateTime = parseIso(date)
  if (!dateTime) return ''
  if (dateTime > reference) return absoluteDate(dateTime, intl)

  const days = calendarDaysBefore(dateTime, reference, intl)
  if (days === 0) return timeOfDay(dateTime, intl)
  if (days === 1) return yesterdayLabel(intl)

  const diff = reference.diff(dateTime, ['months', 'weeks'])
  if (diff.months >= 1) {
    return agoLabel(DATE_MESSAGES.monthsAgo, 'month', Math.round(diff.months), intl)
  }
  if (diff.weeks >= 1) {
    return agoLabel(DATE_MESSAGES.weeksAgo, 'week', Math.round(diff.weeks), intl)
  }
  return agoLabel(DATE_MESSAGES.daysAgo, 'day', days, intl)
}

/** Comment style: Today, Yesterday, days ago within a week, else the date. */
export const formatTimestamp = (
  date?: string | null,
  { reference = DateTime.now(), intl }: RelativeDateOptions = {},
) => {
  const dateTime = parseIso(date)
  if (!dateTime) return ''

  const days = calendarDaysBefore(dateTime, reference, intl)
  if (days === 0) return todayLabel(intl)
  if (days === 1) return yesterdayLabel(intl)
  if (days > 1 && days <= 7) return agoLabel(DATE_MESSAGES.daysAgo, 'day', days, intl)
  return absoluteDate(dateTime, intl)
}

/** Day header style: Today, Yesterday, else the date. */
export const formatDayLabel = (
  date?: string | null,
  { reference = DateTime.now(), intl }: RelativeDateOptions = {},
) => {
  const dateTime = parseIso(date)
  if (!dateTime) return ''

  const days = calendarDaysBefore(dateTime, reference, intl)
  if (days === 0) return todayLabel(intl)
  if (days === 1) return yesterdayLabel(intl)
  return absoluteDate(dateTime, intl)
}
