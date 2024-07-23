import { DateTime } from 'luxon'

import { formatDate, formatDateFromApi, formatDateToApi, formatRelativeTime } from '..'
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
})
