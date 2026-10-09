import type { FC } from 'react'

import type { CommentItem_comment$key } from '../../../../__generated__/CommentItem_comment.graphql'
import type { TimestampProps } from '../../../__shared__/native'
import { CommentsListProps } from '../CommentsList/types'
import type { CommentReactionButtonProps } from './CommentReactionButton/types'
import type { CommentReplyButtonProps } from './CommentReplyButton/types'

export interface CommentItemProps {
  comment: CommentItem_comment$key
  threadDepth?: number
  maxThreadDepth?: number
  RepliesList?: FC<CommentsListProps>
  RepliesListProps?: Partial<CommentsListProps>
  CommentReactionButton?: FC<CommentReactionButtonProps>
  CommentReplyButton?: FC<CommentReplyButtonProps>
  Timestamp?: FC<TimestampProps>
}
