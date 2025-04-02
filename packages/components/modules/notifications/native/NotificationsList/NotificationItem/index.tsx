import { FC } from 'react'

import { Pressable } from 'react-native'
import { useFragment } from 'react-relay'

import { NotificationItemFragment, useNotificationsMarkAsRead } from '../../../common'
import DefaultNotificationItemRenderer from './NotificationItemRenderer'
import { NotificationItemProps } from './types'

const NotificationItem: FC<NotificationItemProps> = ({
  notification: notificationRef,
  NotificationItemRenderer = DefaultNotificationItemRenderer,
  refetch,
}) => {
  const notification = useFragment(NotificationItemFragment, notificationRef)

  const [commitMutation] = useNotificationsMarkAsRead()

  const markAsRead = () => {
    if (notification.unread) {
      commitMutation({
        // TODO: check whether this is needed (clicking on a notification should navigate to the underlying comment,
        // so the screen will not remain visible). If needed, check whether we can use optimistic updates
        onCompleted: refetch,
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
