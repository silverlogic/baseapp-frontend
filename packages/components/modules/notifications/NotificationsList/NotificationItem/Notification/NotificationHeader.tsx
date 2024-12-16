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
  <Box display="grid">
    <Box display="flex" alignItems="center" justifyContent="space-between" gap={1}>
      <Box
        display="grid"
        gap={0.5}
        alignItems="center"
        gridTemplateColumns="repeat(2, max-content)"
      >
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          {actorName}
        </Typography>
        <Typography variant="body2" display="flex" alignItems="center">
          {message}
        </Typography>
      </Box>
      {unread && <TimelineDot color="error" />}
    </Box>
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {timestamp}
    </Typography>
  </Box>
)

export default NotificationHeader
