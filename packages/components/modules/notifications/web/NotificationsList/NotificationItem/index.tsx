import { FC } from 'react'

import { Box } from '@mui/material'
import { useFragment } from 'react-relay'

import { NotificationItemFragment, useNotificationsMarkAsRead } from '../../../common'
import DefaultNotificationItemRenderer from './NotificationItemRenderer'
import { NotificationItemProps } from './types'

const NotificationItem: FC<NotificationItemProps> = ({
  notification: notificationRef,
  NotificationItemRenderer = DefaultNotificationItemRenderer,
}) => {
  const notification = useFragment(NotificationItemFragment, notificationRef)

  const [commitMutation] = useNotificationsMarkAsRead()

  const markAsRead = () => {
    if (notification.unread) {
      commitMutation({
        variables: {
          input: {
            read: true,
            notificationIds: [notification.id],
          },
        },
      })
    }
  }

  return (
    <Box
      onClick={markAsRead}
      sx={{
        cursor: 'pointer',
      }}
    >
      <NotificationItemRenderer notification={notification} />
    </Box>
  )
}

export default NotificationItem
