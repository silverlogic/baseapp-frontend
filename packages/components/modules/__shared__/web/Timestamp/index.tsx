import { FC } from 'react'

import { DATE_MESSAGES, INTL_DATE_FORMAT, INTL_TIME_FORMAT, isToday } from '@baseapp-frontend/utils'

import { Typography } from '@mui/material'
import { DateTime } from 'luxon'
import { FormattedMessage, useIntl } from 'react-intl'

import { Dot } from './styled'
import { TimestampProps } from './types'

const Timestamp: FC<TimestampProps> = ({ date }) => {
  const intl = useIntl()
  const dateTime = DateTime.fromISO(date)
  const jsDate = dateTime.toJSDate()
  const today = isToday(date, { intl })

  return (
    <Typography variant="caption" color="text.secondary" display="flex" alignItems="center">
      {today ? (
        <FormattedMessage {...DATE_MESSAGES.today} />
      ) : (
        intl.formatTime(jsDate, INTL_TIME_FORMAT.short)
      )}
      <Dot />
      {intl.formatDate(jsDate, INTL_DATE_FORMAT.medium)}
    </Typography>
  )
}

export default Timestamp
