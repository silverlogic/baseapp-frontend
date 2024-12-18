import { FC } from 'react'

import { NOTIFICATION_VERB } from '../../constants'
import CommentCreated from '../NotificationItem/CommentCreated'
import CommentReply from '../NotificationItem/CommentReply'
import ReactionCreated from '../NotificationItem/ReactionCreated'
import { NotificationItemRendererProps } from './types'

const NotificationItemRenderer: FC<NotificationItemRendererProps> = ({ notification }) => {
  switch (notification.verb) {
    case NOTIFICATION_VERB.commentCreated:
      return <CommentCreated notification={notification} />
    case NOTIFICATION_VERB.commentReplyCreated:
      return <CommentReply notification={notification} />
    case NOTIFICATION_VERB.reactionCreated:
      return <ReactionCreated notification={notification} />
    default:
      return null
  }
}

export default NotificationItemRenderer
