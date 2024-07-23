import { FC } from 'react'

import { DATE_FORMAT, TIME_FORMAT, formatDate } from '@baseapp-frontend/utils'

import { Typography } from '@mui/material'
import { DateTime } from 'luxon'

import { TimestampProps } from './types'

const Timestamp: FC<TimestampProps> = ({ date }) => {
  const dateTime = DateTime.fromISO(date)
  const isToday = dateTime.hasSame(DateTime.now(), 'day')

  return (
    <Typography variant="caption" color="text.secondary" display="flex" alignItems="center">
      {isToday ? 'Today' : formatDate(dateTime, { toFormat: TIME_FORMAT[3] })}
      <div className="mx-2 inline-block h-1 w-1 rounded-full bg-text-disabled" />
      {formatDate(dateTime, { toFormat: DATE_FORMAT[2] })}
    </Typography>
  )
}

export default Timestamp
