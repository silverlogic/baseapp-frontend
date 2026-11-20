import { FC } from 'react'

import { NOTIFICATION_VERB } from '../../../../common'
import CommentCreated from '../CommentCreated'
import CommentReply from '../CommentReply'
import DefaultGenericNotificationItem from '../GenericNotificationItem'
import ReactionCreated from '../ReactionCreated'
import { NotificationItemRendererProps } from './types'

const NotificationItemRenderer: FC<NotificationItemRendererProps> = ({
  notification,
  GenericNotificationItem = DefaultGenericNotificationItem,
  GenericNotificationItemProps = {},
}) => {
  switch (notification.verb) {
    case NOTIFICATION_VERB.commentCreated:
      return <CommentCreated notification={notification} />
    case NOTIFICATION_VERB.commentReplyCreated:
      return <CommentReply notification={notification} />
    case NOTIFICATION_VERB.reactionCreated:
      return <ReactionCreated notification={notification} />
    default:
      if (!GenericNotificationItem) return null
      return (
        <GenericNotificationItem notification={notification} {...GenericNotificationItemProps} />
      )
  }
}

export default NotificationItemRenderer
