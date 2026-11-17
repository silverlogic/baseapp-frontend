import { FC } from 'react'

import { Typography } from '@mui/material'
import { DateTime } from 'luxon'
import { FormattedMessage, useIntl } from 'react-intl'

import { TIMESTAMP_MESSAGES, formatAbsoluteDate, formatTimeOfDay } from '../../common'
import { Dot } from './styled'
import { TimestampProps } from './types'

const Timestamp: FC<TimestampProps> = ({ date }) => {
  const intl = useIntl()
  const dateTime = DateTime.fromISO(date)
  const isToday = dateTime.hasSame(DateTime.now(), 'day')

  return (
    <Typography variant="caption" color="text.secondary" display="flex" alignItems="center">
      {isToday ? (
        <FormattedMessage {...TIMESTAMP_MESSAGES.today} />
      ) : (
        formatTimeOfDay(intl, dateTime)
      )}
      <Dot />
      {formatAbsoluteDate(intl, dateTime)}
    </Typography>
  )
}

export default Timestamp
