import { FC } from 'react'

import { Pressable } from 'react-native'
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
    <Pressable onPress={markAsRead}>
      <NotificationItemRenderer notification={notification} />
    </Pressable>
  )
}

export default NotificationItem
