import { DateTime, Settings } from 'luxon'
import { createIntl } from 'react-intl'

import { formatDateWithDiffNow, formatDayLabel, formatRelativeTime, formatTimestamp } from '..'
import esMessages from '../../../locales/es.json'

const now = DateTime.fromISO('2026-11-17T15:30:00', { zone: 'utc' })
const ago = (duration: Parameters<DateTime['minus']>[0]) => now.minus(duration).toISO() as string
const intl = createIntl({ locale: 'en', timeZone: 'utc' })
const es = createIntl({ locale: 'es', timeZone: 'utc', messages: esMessages })

// The helpers parse in the system zone, so pin it or the calendar-day cases drift east of UTC.
const previousZone = Settings.defaultZone
beforeAll(() => {
  Settings.defaultZone = 'utc'
})
afterAll(() => {
  Settings.defaultZone = previousZone
})

describe('formatTimestamp', () => {
  it('names the last two calendar days, counts a week in days, then shows the date', () => {
    expect(formatTimestamp(ago({ hours: 2 }), { intl, reference: now })).toBe('Today')
    expect(formatTimestamp(ago({ hours: 16 }), { intl, reference: now })).toBe('Yesterday')
    expect(formatTimestamp(ago({ days: 3 }), { intl, reference: now })).toBe('3 days ago')
    expect(formatTimestamp(ago({ days: 7 }), { intl, reference: now })).toBe('7 days ago')
    expect(formatTimestamp(ago({ days: 8 }), { intl, reference: now })).toBe('Nov 9, 2026')
  })

  it('follows the active locale', () => {
    expect(formatTimestamp(ago({ days: 3 }), { intl: es, reference: now })).toBe('hace 3 días')
    expect(formatTimestamp(ago({ days: 30 }), { intl: es, reference: now })).toBe('18 oct 2026')
  })

  it('keeps English without an intl', () => {
    expect(formatTimestamp(ago({ days: 1 }), { reference: now })).toBe('Yesterday')
    expect(formatTimestamp(ago({ days: 3 }), { reference: now })).toBe('3 days ago')
    expect(formatTimestamp(ago({ days: 8 }), { reference: now })).toBe('Nov 9, 2026')
  })

  it('returns an empty string for a missing or invalid date', () => {
    expect(formatTimestamp(null, { intl, reference: now })).toBe('')
    expect(formatTimestamp('nope', { intl, reference: now })).toBe('')
  })
})

describe('formatDayLabel', () => {
  it('uses Today and Yesterday, otherwise the date', () => {
    expect(formatDayLabel(ago({ minutes: 1 }), { intl, reference: now })).toBe('Today')
    expect(formatDayLabel(ago({ days: 1 }), { intl, reference: now })).toBe('Yesterday')
    expect(formatDayLabel(ago({ days: 2 }), { intl, reference: now })).toBe('Nov 15, 2026')
    expect(formatDayLabel(ago({ days: 1 }), { intl: es, reference: now })).toBe('Ayer')
  })
})

describe('formatDateWithDiffNow', () => {
  it('shows the time today, then days, weeks and months ago', () => {
    expect(formatDateWithDiffNow(ago({ hours: 1 }), { intl, reference: now })).toBe('2:30 PM')
    expect(formatDateWithDiffNow(ago({ days: 1 }), { intl, reference: now })).toBe('Yesterday')
    expect(formatDateWithDiffNow(ago({ days: 3 }), { intl, reference: now })).toBe('3 days ago')
    expect(formatDateWithDiffNow(ago({ weeks: 2 }), { intl, reference: now })).toBe('2 weeks ago')
    expect(formatDateWithDiffNow(ago({ months: 1 }), { intl, reference: now })).toBe('1 month ago')
  })

  it('keeps the luxon time format without an intl', () => {
    expect(formatDateWithDiffNow(ago({ hours: 1 }), { reference: now })).toBe('02:30 PM')
    expect(formatDateWithDiffNow(ago({ weeks: 2 }), { reference: now })).toBe('2 weeks ago')
    expect(formatDateWithDiffNow(ago({ months: 1 }), { reference: now })).toBe('1 month ago')
  })

  it('shows the date for a message from the future', () => {
    expect(
      formatDateWithDiffNow(now.plus({ days: 3 }).toISO() as string, { intl, reference: now }),
    ).toBe('Nov 20, 2026')
  })
})

describe('formatRelativeTime with intl', () => {
  it('counts minutes, hours and days, and shows the date after a month', () => {
    expect(formatRelativeTime(ago({ seconds: 20 }), { intl, reference: now })).toBe('1 minute ago')
    expect(formatRelativeTime(ago({ minutes: 5 }), { intl, reference: now })).toBe('5 minutes ago')
    expect(formatRelativeTime(ago({ hours: 1 }), { intl, reference: now })).toBe('1 hour ago')
    expect(formatRelativeTime(ago({ days: 25 }), { intl, reference: now })).toBe('25 days ago')
    expect(formatRelativeTime(ago({ months: 2 }), { intl, reference: now })).toBe('Sep 17, 2026')
    expect(formatRelativeTime(ago({ hours: 3 }), { intl: es, reference: now })).toBe('hace 3 horas')
  })

  it('returns a dash for a missing date', () => {
    expect(formatRelativeTime(undefined, { intl, reference: now })).toBe('-')
  })
})
