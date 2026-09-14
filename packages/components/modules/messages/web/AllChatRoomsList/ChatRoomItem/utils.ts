import {
  DATE_FORMAT,
  TIME_FORMAT,
  formatDateFromApi,
  isToday,
  isYesterday,
} from '@baseapp-frontend/utils'

import { DateTime } from 'luxon'

// Bound every regex pass so adversarial input cannot cause super-linear runtime:
// the input length is capped and every lazy-quantifier match is constrained to a
// fixed character class and length.
const MAX_PREVIEW_INPUT_LENGTH = 1000

const stripMarkdownSafely = (line: string) =>
  line
    .replace(/!\[([^\]]{0,200})\]\([^)]{0,200}\)/g, '$1')
    .replace(/\[([^\]]{1,200})\]\([^)]{0,200}\)/g, '$1')
    .replace(/`{1,3}([^`]{1,200})`{1,3}/g, '$1')
    .replace(/(\*\*|__)([^*_\n]{1,200})\1/g, '$2')
    .replace(/([*_])([^*_\n]{1,200})\1/g, '$2')
    .replace(/~~([^~\n]{1,200})~~/g, '$1')
    .replace(/^\s*#{1,6}\s*/, '')
    .replace(/^\s*>\s*/, '')
    .replace(/^\s*[-*+]\s+/, '')
    .replace(/^\s*\d+\.\s+/, '')
    .trim()

export const getLastMessagePreview = (content?: string | null) => {
  if (!content) return ''

  return (
    content
      .slice(0, MAX_PREVIEW_INPUT_LENGTH)
      .split(/\r?\n/)
      .map(stripMarkdownSafely)
      .find((line) => line.length > 0) ?? ''
  )
}

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
