import { DateTime } from 'luxon'

import {
  datesDontHaveSameDay,
  formatDate,
  formatDateFromApi,
  formatDateToApi,
  formatRelativeTime,
  isToday,
  isYesterday,
} from '..'
import { DATE_FORMAT, TIME_FORMAT } from '../../../constants/date'

describe('Date formatting utilities', () => {
  describe('formatDate function', () => {
    it('should return empty string for null or undefined input', () => {
      expect(formatDate()).toBe('')
      expect(formatDate(null)).toBe('')
    })

    it('should format DateTime object correctly', () => {
      const date = DateTime.fromISO('2021-09-01T15:30:45')
      expect(formatDate(date, {})).toBe('09/01/21')
      expect(formatDate(date, { toFormat: TIME_FORMAT[1] })).toBe('15:30')
    })

    it('should format string date correctly with default or custom formats', () => {
      expect(formatDate('2021-09-01')).toBe('09/01/21')
      expect(
        formatDate('09/01/2021', {
          fromFormat: DATE_FORMAT[1],
          toFormat: DATE_FORMAT[0],
        }),
      ).toBe('09/01/21')
    })
  })

  describe('formatDateFromApi function', () => {
    it('should return empty string for null or undefined input', () => {
      expect(formatDateFromApi()).toBe('')
      expect(formatDateFromApi(null)).toBe('')
    })

    it('should format API date string correctly', () => {
      expect(formatDateFromApi('2021-09-01')).toBe('09/01/21')
      expect(formatDateFromApi('2021-09-01T15:30:45', { toFormat: TIME_FORMAT[2] })).toBe(
        '03:30 PM',
      )
      expect(formatDateFromApi('2021-09-01T15:30:45', { toFormat: DATE_FORMAT[1] })).toBe(
        '09/01/2021',
      )
    })
  })

  describe('formatDateToApi function', () => {
    it('should return API formatted date for DateTime input', () => {
      const date = DateTime.fromISO('2021-09-01T15:30:45')
      expect(formatDateToApi(date)).toBe('2021-09-01')
    })

    it('should return API formatted date for string input', () => {
      expect(formatDateToApi('09/01/2021', { fromFormat: DATE_FORMAT[1] })).toBe('2021-09-01')
    })
  })

  describe('formatRelativeTime function', () => {
    it('should return "-" for invalid date input', () => {
      expect(formatRelativeTime()).toBe('-')
      expect(formatRelativeTime(null)).toBe('-')
      expect(formatRelativeTime('invalid-date')).toBe('-')
    })

    it('should return correct relative time for minutes ago', () => {
      const date = DateTime.now().minus({ minutes: 10 }).toISO()
      expect(formatRelativeTime(date)).toBe('10 minutes ago')

      const dateOneMinute = DateTime.now().minus({ minutes: 1 }).toISO()
      expect(formatRelativeTime(dateOneMinute)).toBe('1 minute ago')
    })

    it('should return correct relative time for hours ago', () => {
      const date = DateTime.now().minus({ hours: 2 }).toISO()
      expect(formatRelativeTime(date)).toBe('2 hours ago')

      const dateOneHour = DateTime.now().minus({ hours: 1 }).toISO()
      expect(formatRelativeTime(dateOneHour)).toBe('1 hour ago')
    })

    it('should return correct relative time for days ago', () => {
      const date = DateTime.now().minus({ days: 5 }).toISO()
      expect(formatRelativeTime(date)).toBe('5 days ago')

      const dateOneDay = DateTime.now().minus({ days: 1 }).toISO()
      expect(formatRelativeTime(dateOneDay)).toBe('1 day ago')
    })

    it('should return formatted date for months ago', () => {
      const date = DateTime.now().minus({ months: 3 }).toISO()
      expect(formatRelativeTime(date, { toFormat: DATE_FORMAT[0] })).toBe(
        DateTime.fromISO(date).toFormat(DATE_FORMAT[0]),
      )
    })

    it('should handle custom reference date correctly', () => {
      const reference = DateTime.fromISO('2021-09-01T15:30:45')
      const date = DateTime.fromISO('2021-08-31T15:30:45').toISO()
      expect(formatRelativeTime(date, { reference })).toBe('1 day ago')
    })
  })

  describe('isToday function', () => {
    it("should return true for today's date", () => {
      const today = DateTime.now().toISO()
      expect(isToday(today)).toBe(true)
    })

    it('should return false for a date in the past', () => {
      const pastDate = DateTime.now().minus({ days: 1 }).toISO()
      expect(isToday(pastDate)).toBe(false)
    })

    it('should return false for a date in the future', () => {
      const futureDate = DateTime.now().plus({ days: 1 }).toISO()
      expect(isToday(futureDate)).toBe(false)
    })

    it('should return false for invalid date strings', () => {
      expect(isToday('invalid-date')).toBe(false)
    })

    it('should handle date strings with different time zones correctly', () => {
      const dateInUTC = DateTime.utc().toISO()
      expect(isToday(dateInUTC)).toBe(true)
    })

    it('should handle dates at the edge of the day correctly', () => {
      const endOfYesterday = DateTime.now().startOf('day').minus({ milliseconds: 1 }).toISO()
      expect(isToday(endOfYesterday)).toBe(false)

      const startOfToday = DateTime.now().startOf('day').toISO()
      expect(isToday(startOfToday)).toBe(true)
    })
  })

  describe('isYesterday function', () => {
    it("should return true for yesterday's date", () => {
      const yesterday = DateTime.now().minus({ days: 1 }).toISO()
      expect(isYesterday(yesterday)).toBe(true)
    })

    it("should return false for today's date", () => {
      const today = DateTime.now().toISO()
      expect(isYesterday(today)).toBe(false)
    })

    it('should return false for dates older than yesterday', () => {
      const twoDaysAgo = DateTime.now().minus({ days: 2 }).toISO()
      expect(isYesterday(twoDaysAgo)).toBe(false)
    })

    it('should return false for future dates', () => {
      const tomorrow = DateTime.now().plus({ days: 1 }).toISO()
      expect(isYesterday(tomorrow)).toBe(false)
    })

    it('should return false for invalid date strings', () => {
      expect(isYesterday('invalid-date')).toBe(false)
    })

    it('should handle date strings with different time zones correctly', () => {
      const yesterdayInUTC = DateTime.utc().minus({ days: 1 }).toISO()
      expect(isYesterday(yesterdayInUTC)).toBe(true)
    })

    it('should handle dates at the edge of the day correctly', () => {
      const endOfYesterday = DateTime.now().minus({ days: 1 }).endOf('day').toISO()
      expect(isYesterday(endOfYesterday)).toBe(true)

      const startOfToday = DateTime.now().startOf('day').toISO()
      expect(isYesterday(startOfToday)).toBe(false)
    })
  })

  describe('datesDontHaveSameDay function', () => {
    it('should return false when both dates are on the same day', () => {
      const date1 = '2021-09-01T10:00:00'
      const date2 = '2021-09-01T15:30:45'
      expect(datesDontHaveSameDay(date1, date2)).toBe(false)
    })

    it('should return true when dates are on different days', () => {
      const date1 = '2021-09-01T23:59:59'
      const date2 = '2021-09-02T00:00:00'
      expect(datesDontHaveSameDay(date1, date2)).toBe(true)
    })

    it('should return true when dates are in different months', () => {
      const date1 = '2021-08-31T12:00:00'
      const date2 = '2021-09-01T12:00:00'
      expect(datesDontHaveSameDay(date1, date2)).toBe(true)
    })

    it('should return true when dates are in different years', () => {
      const date1 = '2020-12-31T12:00:00'
      const date2 = '2021-01-01T12:00:00'
      expect(datesDontHaveSameDay(date1, date2)).toBe(true)
    })

    it('should return false when both dates are identical', () => {
      const date = '2021-09-01T12:00:00'
      expect(datesDontHaveSameDay(date, date)).toBe(false)
    })

    it('should return false when dates are the same day but different time zones', () => {
      const date1 = DateTime.fromISO('2021-09-01T12:00:00', { zone: 'UTC' }).toISO() as string
      const date2 = DateTime.fromISO('2021-09-01T08:00:00', {
        zone: 'America/New_York',
      }).toISO() as string
      expect(datesDontHaveSameDay(date1, date2)).toBe(false)
    })

    it('should handle invalid date strings gracefully', () => {
      expect(datesDontHaveSameDay('invalid-date', '2021-09-01')).toBe(true)
      expect(datesDontHaveSameDay('2021-09-01', 'invalid-date')).toBe(true)
      expect(datesDontHaveSameDay('invalid-date', 'also-invalid')).toBe(true)
    })
  })
})
