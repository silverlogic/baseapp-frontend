import { FC } from 'react'

import { Box, Typography } from '@mui/material'

import { Log } from '../ActivityLog/types'

interface LogItemProps {
  log: Log
}

const LogItem: FC<LogItemProps> = ({ log }) => (
  <Box display="flex" alignItems="center" borderLeft="1px solid #000" marginLeft="20px">
    <Typography variant="body2">
      {log.user?.fullName} {log.verb}
    </Typography>
  </Box>
)

export default LogItem
