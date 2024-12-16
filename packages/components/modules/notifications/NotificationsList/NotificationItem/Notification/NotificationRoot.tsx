import { FC, PropsWithChildren } from 'react'

import { Box } from '@mui/material'

const NotificationRoot: FC<PropsWithChildren> = ({ children }) => (
  <Box display="grid" gap={2} gridTemplateColumns="min-content 1fr" padding={2.5}>
    {children}
  </Box>
)

export default NotificationRoot
