import {
  DATE_FORMAT,
  TIME_FORMAT,
  formatDateFromApi,
  isToday,
  isYesterday,
} from '@baseapp-frontend/utils'

import {
  differenceInDays,
  differenceInMonths,
  differenceInWeeks,
  isValid,
  parseISO,
} from 'date-fns'

export const formatDate = (date?: string | null) => {
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
