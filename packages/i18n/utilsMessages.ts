import { IntlShape } from 'react-intl'

/**
 * Format relative time using intl
 */
export const formatRelativeTimeWithIntl = (
  intl: IntlShape,
  minutesDiff: number,
  hoursDiff: number,
  daysDiff: number,
  weeksDiff: number,
  monthsDiff: number,
): string => {
  if (monthsDiff >= 1) {
    return intl.formatMessage({ id: 'utils.time.monthsAgo' }, { count: monthsDiff })
  }

  if (weeksDiff >= 1) {
    return intl.formatMessage({ id: 'utils.time.weeksAgo' }, { count: weeksDiff })
  }

  if (daysDiff >= 1) {
    return intl.formatMessage({ id: 'utils.time.daysAgo' }, { count: daysDiff })
  }

  if (hoursDiff >= 1) {
    return intl.formatMessage({ id: 'utils.time.hoursAgo' }, { count: hoursDiff })
  }

  return intl.formatMessage({ id: 'utils.time.minutesAgo' }, { count: minutesDiff || 1 })
}
