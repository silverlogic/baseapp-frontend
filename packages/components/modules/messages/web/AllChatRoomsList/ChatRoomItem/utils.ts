import {
  DATE_FORMAT,
  TIME_FORMAT,
  formatDateFromApi,
  isToday,
  isYesterday,
} from '@baseapp-frontend/utils'

import { DateTime } from 'luxon'

export const formatDate = (date?: string | null) => {
  if (!date) return ''
  const dateTime = DateTime.fromISO(date)
  if (!dateTime.isValid) return ''

  if (isToday(date)) return formatDateFromApi(date, { toFormat: TIME_FORMAT[2] })

  if (isYesterday(date)) return 'Yesterday'

  const diff = dateTime.diffNow(['years', 'months', 'weeks', 'days']).toObject()

  if (diff.months && Math.abs(diff.months) > 0) {
    if (Math.abs(diff.months) > 1) return `${Math.abs(diff.months).toFixed(0)} months ago`
    return '1 month ago'
  }

  if (diff.weeks && Math.abs(diff.weeks) > 0) {
    if (Math.abs(diff.weeks) > 1) return `${Math.abs(diff.weeks).toFixed(0)} weeks ago`
    return '1 week ago'
  }

  if (diff.days && Math.abs(diff.days) > 0) return `${Math.abs(diff.days).toFixed(0)} days ago`

  return formatDateFromApi(date, { toFormat: DATE_FORMAT[2] })
}
