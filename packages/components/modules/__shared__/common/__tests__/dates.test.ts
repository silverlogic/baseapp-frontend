import { DateTime } from 'luxon'
import { createIntl } from 'react-intl'

import esMessages from '../../../../locales/es.json'
import { formatChatRoomDate, formatDayLabel, formatRelativeTime, formatTimestamp } from '../dates'

const now = DateTime.fromISO('2026-11-17T15:30:00', { zone: 'utc' })
const ago = (duration: Parameters<DateTime['minus']>[0]) => now.minus(duration).toISO() as string
const intl = createIntl({ locale: 'en', timeZone: 'utc' })
const es = createIntl({ locale: 'es', timeZone: 'utc', messages: esMessages })

describe('formatTimestamp', () => {
  it('names the last two calendar days, counts a week in days, then shows the date', () => {
    expect(formatTimestamp(intl, ago({ hours: 2 }), now)).toBe('Today')
    expect(formatTimestamp(intl, ago({ hours: 16 }), now)).toBe('Yesterday')
    expect(formatTimestamp(intl, ago({ days: 3 }), now)).toBe('3 days ago')
    expect(formatTimestamp(intl, ago({ days: 7 }), now)).toBe('7 days ago')
    expect(formatTimestamp(intl, ago({ days: 8 }), now)).toBe('Nov 9, 2026')
  })

  it('follows the active locale', () => {
    expect(formatTimestamp(es, ago({ days: 3 }), now)).toBe('hace 3 días')
    expect(formatTimestamp(es, ago({ days: 30 }), now)).toBe('18 oct 2026')
  })

  it('returns an empty string for a missing or invalid date', () => {
    expect(formatTimestamp(intl, null, now)).toBe('')
    expect(formatTimestamp(intl, 'nope', now)).toBe('')
  })
})

describe('formatDayLabel', () => {
  it('uses Today and Yesterday, otherwise the date', () => {
    expect(formatDayLabel(intl, ago({ minutes: 1 }), now)).toBe('Today')
    expect(formatDayLabel(intl, ago({ days: 1 }), now)).toBe('Yesterday')
    expect(formatDayLabel(intl, ago({ days: 2 }), now)).toBe('Nov 15, 2026')
  })
})

describe('formatChatRoomDate', () => {
  it('shows the time today, then days, weeks and months ago', () => {
    expect(formatChatRoomDate(intl, ago({ hours: 1 }), now)).toBe('2:30 PM')
    expect(formatChatRoomDate(intl, ago({ days: 1 }), now)).toBe('Yesterday')
    expect(formatChatRoomDate(intl, ago({ days: 3 }), now)).toBe('3 days ago')
    expect(formatChatRoomDate(intl, ago({ weeks: 2 }), now)).toBe('2 weeks ago')
    expect(formatChatRoomDate(intl, ago({ months: 1 }), now)).toBe('1 month ago')
  })

  it('shows the date for a message from the future', () => {
    expect(formatChatRoomDate(intl, now.plus({ days: 3 }).toISO() as string, now)).toBe(
      'Nov 20, 2026',
    )
  })
})

describe('formatRelativeTime', () => {
  it('counts minutes, hours and days, and shows the date after a month', () => {
    expect(formatRelativeTime(intl, ago({ seconds: 20 }), now)).toBe('1 minute ago')
    expect(formatRelativeTime(intl, ago({ minutes: 5 }), now)).toBe('5 minutes ago')
    expect(formatRelativeTime(intl, ago({ hours: 1 }), now)).toBe('1 hour ago')
    expect(formatRelativeTime(intl, ago({ days: 25 }), now)).toBe('25 days ago')
    expect(formatRelativeTime(intl, ago({ months: 2 }), now)).toBe('Sep 17, 2026')
  })

  it('returns a dash for a missing date', () => {
    expect(formatRelativeTime(intl, undefined, now)).toBe('-')
  })
})
