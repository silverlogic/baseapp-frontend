import { IntlShape, defineMessages } from 'react-intl'

export const DATE_MESSAGES = defineMessages({
  today: { id: 'utils.date.today', defaultMessage: 'Today' },
  yesterday: { id: 'utils.date.yesterday', defaultMessage: 'Yesterday' },
  minutesAgo: {
    id: 'utils.time.minutesAgo',
    defaultMessage: '{count, plural, one {1 minute ago} other {{count} minutes ago}}',
  },
  hoursAgo: {
    id: 'utils.time.hoursAgo',
    defaultMessage: '{count, plural, one {1 hour ago} other {{count} hours ago}}',
  },
  daysAgo: {
    id: 'utils.time.daysAgo',
    defaultMessage: '{count, plural, one {1 day ago} other {{count} days ago}}',
  },
  weeksAgo: {
    id: 'utils.time.weeksAgo',
    defaultMessage: '{count, plural, one {1 week ago} other {{count} weeks ago}}',
  },
  monthsAgo: {
    id: 'utils.time.monthsAgo',
    defaultMessage: '{count, plural, one {1 month ago} other {{count} months ago}}',
  },
})

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
    return intl.formatMessage(DATE_MESSAGES.monthsAgo, { count: monthsDiff })
  }

  if (weeksDiff >= 1) {
    return intl.formatMessage(DATE_MESSAGES.weeksAgo, { count: weeksDiff })
  }

  if (daysDiff >= 1) {
    return intl.formatMessage(DATE_MESSAGES.daysAgo, { count: daysDiff })
  }

  if (hoursDiff >= 1) {
    return intl.formatMessage(DATE_MESSAGES.hoursAgo, { count: hoursDiff })
  }

  return intl.formatMessage(DATE_MESSAGES.minutesAgo, { count: minutesDiff || 1 })
}
