import { FC } from 'react'

import { Box } from '@mui/material'
import { useFragment } from 'react-relay'

import { NOTIFICATION_VERB } from '../../constants'
import { useNotificationsMarkAsRead } from '../../graphql/mutations/NotificationsMarkAsRead'
import { NotificationItemFragment } from '../../graphql/queries/NotificationItem'
import CommentReply from './CommentReply'
import { NotificationItemProps } from './types'

const NotificationItem: FC<NotificationItemProps> = ({ notification: notificationRef }) => {
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

  const renderContent = () => {
    switch (notification.verb) {
      case NOTIFICATION_VERB.commentCreated:
        return <CommentReply notification={notification} />
      case NOTIFICATION_VERB.commentReplyCreated:
        return <CommentReply notification={notification} />
      default:
        return null
    }
  }

  return (
    <Box
      onClick={markAsRead}
      sx={{
        cursor: 'pointer',
      }}
    >
      {renderContent()}
    </Box>
  )
}

export default NotificationItem
