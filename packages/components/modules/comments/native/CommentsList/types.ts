import type { FC } from 'react'

import type { CommentItem_comment$data } from '../../../../__generated__/CommentItem_comment.graphql'
import type { CommentsList_comments$key } from '../../../../__generated__/CommentsList_comments.graphql'
import type { CommentItemProps } from '../CommentItem/types'

export interface CommentsListProps {
  target: CommentsList_comments$key
  subscriptionsEnabled: boolean
  threadDepth?: number
  CommentItem?: FC<CommentItemProps>
  CommentItemProps?: Partial<CommentItemProps>
  CommentsListProps?: Partial<CommentsListProps>
  onReply?: (comment: CommentItem_comment$data) => void
  commentIdToExpand?: string | null
  onLongPress?: (comment: CommentItem_comment$data) => void
}
