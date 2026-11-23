import { defineMessages } from '@formatjs/intl'

export const DATE_FORMAT = {
  0: 'MM/dd/yy',
  1: 'MM/dd/yyyy',
  2: 'LLL d, yyyy',
  3: 'dd MMM yyyy',
  api: 'yyyy-MM-dd',
  iso: 'yyyy-MM-ddTHH:mm:ss.SSS',
} as const

export const TIME_FORMAT = {
  0: 'hh:mma',
  1: 'HH:mm',
  2: 'hh:mm a',
  3: 'h:mm a',
} as const

export const INTL_DATE_FORMAT = {
  medium: { month: 'short', day: 'numeric', year: 'numeric' },
} as const satisfies Record<string, Intl.DateTimeFormatOptions>

export const INTL_TIME_FORMAT = {
  short: { hour: 'numeric', minute: '2-digit' },
} as const satisfies Record<string, Intl.DateTimeFormatOptions>

export const DATE_MESSAGES = defineMessages({
  today: { id: 'utils.date.today', defaultMessage: 'Today' },
  yesterday: { id: 'utils.date.yesterday', defaultMessage: 'Yesterday' },
  minutesAgo: {
    id: 'utils.date.minutesAgo',
    defaultMessage: '{count, plural, one {# minute ago} other {# minutes ago}}',
  },
  hoursAgo: {
    id: 'utils.date.hoursAgo',
    defaultMessage: '{count, plural, one {# hour ago} other {# hours ago}}',
  },
  daysAgo: {
    id: 'utils.date.daysAgo',
    defaultMessage: '{count, plural, one {# day ago} other {# days ago}}',
  },
  weeksAgo: {
    id: 'utils.date.weeksAgo',
    defaultMessage: '{count, plural, one {# week ago} other {# weeks ago}}',
  },
  monthsAgo: {
    id: 'utils.date.monthsAgo',
    defaultMessage: '{count, plural, one {# month ago} other {# months ago}}',
  },
})
