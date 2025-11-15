import { FC } from 'react'

import { TIME_FORMAT, formatDate } from '@baseapp-frontend/utils'

import { Typography } from '@mui/material'
import { parseISO } from 'date-fns'

import { TimestampProps } from './types'

const Timestamp: FC<TimestampProps> = ({ date }) => {
  if (!date) return null

  const dateTime = parseISO(date)

  return (
    <Typography
      variant="overline"
      color="text.secondary"
      display="flex"
      alignItems="center"
      paddingX={1}
      paddingY={1 / 2}
    >
      {formatDate(dateTime, { toFormat: TIME_FORMAT[2] })}
    </Typography>
  )
}

export default Timestamp
