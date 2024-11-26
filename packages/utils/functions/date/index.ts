import { DateTime } from 'luxon'

import { DATE_FORMAT } from '../../constants/date'
import {
  FormatDateFromApiOptions,
  FormatDateOptions,
  FormatDateToApiOptions,
  FormatRelativeTimeOptions,
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

export const formatRelativeTime = (
  date?: string | null,
  { reference = DateTime.now(), toFormat = DATE_FORMAT[2] }: FormatRelativeTimeOptions = {},
) => {
  const dateFromApi = DateTime.fromISO(date ?? '')

  if (!dateFromApi.isValid) return '-'

  const diff = reference.diff(dateFromApi, ['minutes', 'hours', 'days', 'months']).toObject()

  const minutesDiff = diff.minutes ?? 0
  const hoursDiff = diff.hours ?? 0
  const daysDiff = diff.days ?? 0
  const monthsDiff = diff.months ?? 0

  if (monthsDiff >= 1) {
    return formatDate(dateFromApi, { toFormat })
  }

  if (daysDiff < 1) {
    if (hoursDiff >= 1) {
      return hoursDiff >= 2 ? `${Math.floor(hoursDiff)} hours ago` : '1 hour ago'
    }
    return minutesDiff >= 2 ? `${Math.floor(minutesDiff)} minutes ago` : '1 minute ago'
  }

  return daysDiff >= 2 ? `${Math.floor(daysDiff)} days ago` : '1 day ago'
}

export const isToday = (date: string) => {
  if (!date) return false
  return DateTime.fromISO(date).hasSame(DateTime.now(), 'day')
}

export const isYesterday = (date: string) => {
  if (!date) return false
  return DateTime.fromISO(date).hasSame(DateTime.now().minus({ days: 1 }), 'day')
}

export const datesDontHaveSameDay = (date1: string, date2: string) => {
  if (!date1 || !date2) return true

  const dt1 = DateTime.fromISO(date1)
  const dt2 = DateTime.fromISO(date2)

  if (!dt1.isValid || !dt2.isValid) return true

  return !dt1.hasSame(dt2, 'day')
}
