import { FC } from 'react'

import { TimelineDot } from '@mui/lab'
import { Box, Typography } from '@mui/material'

import { NotificationHeaderProps } from './types'

const NotificationHeader: FC<NotificationHeaderProps> = ({
  actorName,
  message,
  unread,
  timestamp,
}) => (
  <Box display="grid" minWidth={0}>
    <Box display="flex" alignItems="flex-start" justifyContent="space-between" gap={1} minWidth={0}>
      <Box minWidth={0}>
        <Typography variant="body2" component="span" sx={{ fontWeight: 700 }}>
          {actorName ?? ''}
        </Typography>{' '}
        <Typography variant="body2" component="span">
          {message}
        </Typography>
      </Box>
      {unread && <TimelineDot color="error" sx={{ flexShrink: 0 }} />}
    </Box>
    <Typography variant="caption" color="text.disabled">
      {timestamp}
    </Typography>
  </Box>
)

export default NotificationHeader
