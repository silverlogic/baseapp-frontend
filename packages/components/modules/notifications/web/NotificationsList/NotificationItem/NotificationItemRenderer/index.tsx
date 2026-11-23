import { FC } from 'react'

import { NOTIFICATION_VERB } from '../../../../common'
import DefaultCardHoldNotification from '../CardHoldNotification'
import DefaultCommentCreated from '../CommentCreated'
import DefaultCommentReply from '../CommentReply'
import DefaultReactionCreated from '../ReactionCreated'
import { NotificationItemRendererProps } from './types'

const NotificationItemRenderer: FC<NotificationItemRendererProps> = ({
  notification,
  CommentCreated = DefaultCommentCreated,
  CommentCreatedProps = {},
  CommentReply = DefaultCommentReply,
  CommentReplyProps = {},
  ReactionCreated = DefaultReactionCreated,
  ReactionCreatedProps = {},
  CardHoldNotification = DefaultCardHoldNotification,
  CardHoldNotificationProps = {},
}) => {
  switch (notification.verb) {
    case NOTIFICATION_VERB.commentCreated:
      return <CommentCreated notification={notification} {...CommentCreatedProps} />
    case NOTIFICATION_VERB.commentReplyCreated:
      return <CommentReply notification={notification} {...CommentReplyProps} />
    case NOTIFICATION_VERB.reactionCreated:
      return <ReactionCreated notification={notification} {...ReactionCreatedProps} />
    case NOTIFICATION_VERB.cardHoldFailed:
      return <CardHoldNotification notification={notification} {...CardHoldNotificationProps} />
    default:
      return null
  }
}

export default NotificationItemRenderer
