import { FC } from 'react'

import { NOTIFICATION_VERB } from '../../../../common'
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
}) => {
  switch (notification.verb) {
    case NOTIFICATION_VERB.commentCreated:
      return <CommentCreated notification={notification} {...CommentCreatedProps} />
    case NOTIFICATION_VERB.commentReplyCreated:
      return <CommentReply notification={notification} {...CommentReplyProps} />
    case NOTIFICATION_VERB.reactionCreated:
      return <ReactionCreated notification={notification} {...ReactionCreatedProps} />
    default:
      return null
  }
}

export default NotificationItemRenderer
