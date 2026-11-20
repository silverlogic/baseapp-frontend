import { DATE_FORMAT, formatDateFromApi, isToday, isYesterday } from '@baseapp-frontend/utils'

import { IntlShape } from 'react-intl'

import { SHARED_MESSAGES } from '../../__shared__/constants'
import { MESSAGES_GROUP_MESSAGES } from './constants'

export const displayFormattedDate = (intl: IntlShape, date: string) => {
  if (isToday(date)) return intl.formatMessage(MESSAGES_GROUP_MESSAGES.today)
  if (isYesterday(date)) return intl.formatMessage(SHARED_MESSAGES.yesterday)
  return formatDateFromApi(date, { toFormat: DATE_FORMAT[2] })
}
