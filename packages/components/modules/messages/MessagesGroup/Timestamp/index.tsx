import { FC } from 'react'

import { TIME_FORMAT, formatDate } from '@baseapp-frontend/utils'

import { Typography } from '@mui/material'
import { DateTime } from 'luxon'

import { TimestampProps } from './types'

const Timestamp: FC<TimestampProps> = ({ date }) => {
  const dateTime = DateTime.fromISO(date)

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
