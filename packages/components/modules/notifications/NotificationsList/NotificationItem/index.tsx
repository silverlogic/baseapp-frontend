import { FC } from 'react'

import { Box } from '@mui/material'
import { useFragment } from 'react-relay'

import { useNotificationsMarkAsRead } from '../../graphql/mutations/NotificationsMarkAsRead'
import { NotificationItemFragment } from '../../graphql/queries/NotificationItem'
import DefaultNotificationContentRenderer from '../NotificationItemRenderer'
import { NotificationItemProps } from './types'

const NotificationItem: FC<NotificationItemProps> = ({
  notification: notificationRef,
  NotificationItemRenderer = DefaultNotificationContentRenderer,
}) => {
  const notification = useFragment(NotificationItemFragment, notificationRef)

  const commitMutation = useNotificationsMarkAsRead()[0]
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
