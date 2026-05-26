import {
  DATE_FORMAT,
  TIME_FORMAT,
  formatDateFromApi,
  isToday,
  isYesterday,
} from '@baseapp-frontend/utils'

import { DateTime } from 'luxon'

export const getLastMessagePreview = (content?: string | null) => {
  if (!content) return ''

  const firstLine =
    content
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(p|div|li|h[1-6]|blockquote|tr)\s*>/gi, '\n')
      .replace(/<[^>]*>/g, '')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .find((line) => line.length > 0) ?? ''

  return firstLine
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`{1,3}([^`]+)`{1,3}/g, '$1')
    .replace(/(\*\*|__)(.+?)\1/g, '$2')
    .replace(/(\*|_)(.+?)\1/g, '$2')
    .replace(/~~(.+?)~~/g, '$1')
    .replace(/^\s*#{1,6}\s*/g, '')
    .replace(/^\s*>\s*/g, '')
    .replace(/^\s*[-*+]\s+/g, '')
    .replace(/^\s*\d+\.\s+/g, '')
    .trim()
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
