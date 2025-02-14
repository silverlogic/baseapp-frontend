import { Box } from '@mui/material'

import NotificationBody from './NotificationBody'
import NotificationHeader from './NotificationHeader'
import { NotificationContentProps } from './types'

const NotificationContent: NotificationContentProps = ({ children }) => (
  <Box display="grid" gap={1}>
    {children}
  </Box>
)

NotificationContent.Header = NotificationHeader
NotificationContent.Body = NotificationBody

export default NotificationContent
