import { FC } from 'react'

import { NotificationItemFragment$data } from '../../../../../../__generated__/NotificationItemFragment.graphql'
import { CommentCreatedProps } from '../CommentCreated/types'
import { CommentReplyProps } from '../CommentReply/types'
import { GenericNotificationItemProps } from '../GenericNotificationItem/types'
import { ReactionCreatedProps } from '../ReactionCreated/types'

export interface NotificationItemRendererProps {
  notification: NotificationItemFragment$data
  CommentCreated?: FC<CommentCreatedProps>
  CommentCreatedProps?: Partial<CommentCreatedProps>
  CommentReply?: FC<CommentReplyProps>
  CommentReplyProps?: Partial<CommentReplyProps>
  ReactionCreated?: FC<ReactionCreatedProps>
  ReactionCreatedProps?: Partial<ReactionCreatedProps>
  /**
   * Renders notifications whose verb has no dedicated component. Pass `null` to render nothing for
   * them, as before this fallback existed.
   */
  GenericNotificationItem?: FC<GenericNotificationItemProps> | null
  GenericNotificationItemProps?: Partial<GenericNotificationItemProps>
}
