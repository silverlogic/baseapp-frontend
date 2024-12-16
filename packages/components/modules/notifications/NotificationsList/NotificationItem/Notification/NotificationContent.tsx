import { FC, PropsWithChildren } from 'react'

import { Box } from '@mui/material'

import NotificationCommentBody from './NotificationCommentBody'
import NotificationHeader from './NotificationHeader'

export interface NotificationContentProps {
  Header: typeof NotificationHeader
  Body: typeof NotificationCommentBody
}

const NotificationContent: FC<PropsWithChildren> & NotificationContentProps = ({ children }) => (
  <Box display="grid" gap={1}>
    {children}
  </Box>
)

NotificationContent.Header = NotificationHeader
NotificationContent.Body = NotificationCommentBody

export default NotificationContent
