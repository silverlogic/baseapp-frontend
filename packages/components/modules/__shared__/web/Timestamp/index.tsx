import { FC } from 'react'

import { DATE_FORMAT, TIME_FORMAT, formatDate } from '@baseapp-frontend/utils'

import { Typography } from '@mui/material'
import { isToday as dateFnsIsToday, parseISO } from 'date-fns'

import { TimestampProps } from './types'

const Timestamp: FC<TimestampProps> = ({ date }) => {
  if (!date) return null

  const dateTime = parseISO(date)
  const isToday = dateFnsIsToday(dateTime)

  return (
    <Typography variant="caption" color="text.secondary" display="flex" alignItems="center">
      {isToday ? 'Today' : formatDate(dateTime, { toFormat: TIME_FORMAT[3] })}
      <div className="mx-2 inline-block h-1 w-1 rounded-full bg-text-disabled" />
      {formatDate(dateTime, { toFormat: DATE_FORMAT[2] })}
    </Typography>
  )
}

export default Timestamp
