import {
  isToday as dateFnsIsToday,
  isYesterday as dateFnsIsYesterday,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInWeeks,
  format,
  isSameDay,
  isValid,
  parse,
  parseISO,
} from 'date-fns'

import { DATE_FORMAT, TIME_FORMAT } from '../../constants/date'
import {
  FormatDateFromApiOptions,
  FormatDateOptions,
  FormatDateToApiOptions,
  FormatRelativeTimeOptions,
} from '../../types/date'

// Map Luxon format strings to date-fns format strings
const formatMap: Record<string, string> = {
  'MM/dd/yy': 'MM/dd/yy',
  'MM/dd/yyyy': 'MM/dd/yyyy',
  'LLL d, yyyy': 'MMM d, yyyy',
  'dd MMM yyyy': 'dd MMM yyyy',
  'yyyy-MM-dd': 'yyyy-MM-dd',
  'hh:mma': 'hh:mma',
  'HH:mm': 'HH:mm',
  'hh:mm a': 'hh:mm a',
  'h:mm a': 'h:mm a',
}

const convertFormat = (luxonFormat: string): string => formatMap[luxonFormat] || luxonFormat

export const formatDate = (
  date?: string | Date | null,
  { toFormat = DATE_FORMAT[0], fromFormat = DATE_FORMAT[0] }: FormatDateOptions = {},
) => {
  if (!date) return ''
  if (date instanceof Date) return format(date, convertFormat(toFormat))
  const parsedDate = parse(date, convertFormat(fromFormat), new Date())
  return format(parsedDate, convertFormat(toFormat))
}

export const formatDateFromApi = (
  date?: string | null,
  { toFormat = DATE_FORMAT[0] }: FormatDateFromApiOptions = {},
) => {
  if (!date) return ''
  const parsedDate = parseISO(date)
  return format(parsedDate, convertFormat(toFormat))
}

export const formatDateToApi = (
  date?: string | Date | null,
  { fromFormat = DATE_FORMAT[0] }: FormatDateToApiOptions = {},
) => formatDate(date, { toFormat: DATE_FORMAT.api, fromFormat })

export const formatRelativeTime = (
  date?: string | null,
  { reference = new Date(), toFormat = DATE_FORMAT[2] }: FormatRelativeTimeOptions = {},
) => {
  const dateFromApi = parseISO(date ?? '')

  if (!isValid(dateFromApi)) return '-'

  const minutesDiff = differenceInMinutes(reference, dateFromApi)
  const hoursDiff = differenceInHours(reference, dateFromApi)
  const daysDiff = differenceInDays(reference, dateFromApi)
  const monthsDiff = differenceInMonths(reference, dateFromApi)

  if (monthsDiff >= 1) {
    return format(dateFromApi, convertFormat(toFormat))
  }

  if (daysDiff < 1) {
    if (hoursDiff >= 1) {
      return hoursDiff >= 2 ? `${hoursDiff} hours ago` : '1 hour ago'
    }
    return minutesDiff >= 2 ? `${minutesDiff} minutes ago` : '1 minute ago'
  }

  return daysDiff >= 2 ? `${daysDiff} days ago` : '1 day ago'
}

export const isToday = (date: string) => {
  if (!date) return false
  const parsedDate = parseISO(date)
  if (!isValid(parsedDate)) return false
  return dateFnsIsToday(parsedDate)
}

export const isYesterday = (date: string) => {
  if (!date) return false
  const parsedDate = parseISO(date)
  if (!isValid(parsedDate)) return false
  return dateFnsIsYesterday(parsedDate)
}

export const datesDontHaveSameDay = (date1: string, date2: string) => {
  if (!date1 || !date2) return true

  const dt1 = parseISO(date1)
  const dt2 = parseISO(date2)

  if (!isValid(dt1) || !isValid(dt2)) return true

  return !isSameDay(dt1, dt2)
}

export const formatDateWithDiffNow = (date?: string | null) => {
  if (!date) return ''
  const dateTime = parseISO(date)
  if (!isValid(dateTime)) return ''

  if (isToday(date)) return formatDateFromApi(date, { toFormat: TIME_FORMAT[2] })
  if (isYesterday(date)) return 'Yesterday'

  const now = new Date()
  const monthsDiff = differenceInMonths(now, dateTime)
  const weeksDiff = differenceInWeeks(now, dateTime)
  const daysDiff = differenceInDays(now, dateTime)

  if (monthsDiff > 0) {
    if (monthsDiff > 1) return `${monthsDiff} months ago`
    return '1 month ago'
  }
  if (weeksDiff > 0) {
    if (weeksDiff > 1) return `${weeksDiff} weeks ago`
    return '1 week ago'
  }
  if (daysDiff > 0) return `${daysDiff} days ago`

  return formatDateFromApi(date, { toFormat: DATE_FORMAT[2] })
}
