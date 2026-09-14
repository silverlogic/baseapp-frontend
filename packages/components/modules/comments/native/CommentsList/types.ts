import type { FC, ReactElement } from 'react'

import type { CommentsList_comments$key } from '../../../../__generated__/CommentsList_comments.graphql'
import type { CommentItemProps } from '../CommentItem/types'

export interface CommentsListProps {
  target: CommentsList_comments$key
  subscriptionsEnabled: boolean
  threadDepth?: number
  CommentItem?: FC<CommentItemProps>
  CommentItemProps?: Partial<CommentItemProps>
  CommentsListProps?: Partial<CommentsListProps>
  isReplyList?: boolean
  onHideReplies?: () => void
  maxThreadDepth?: number
  /**
   * Rendered above the comments as the top-level list header so it scrolls together with the
   * thread. Only applied to the root (non-reply) list.
   */
  ListHeaderComponent?: ReactElement | null
  onRefetchReady?: (refetch: () => void) => void
}
