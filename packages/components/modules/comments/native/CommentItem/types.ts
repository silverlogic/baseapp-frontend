import type { FC } from 'react'

import type { CommentItem_comment$key } from '../../../../__generated__/CommentItem_comment.graphql'
import type { CommentItem_target$key } from '../../../../__generated__/CommentItem_target.graphql'
import type { TimestampProps } from '../../../__shared__/native'
import type { CommentReactionButtonProps } from './CommentReactionButton/types'
import type { CommentReplyButtonProps } from './CommentReplyButton/types'

export interface CommentItemProps {
  comment: CommentItem_comment$key
  target: CommentItem_target$key
  CommentReactionButton?: FC<CommentReactionButtonProps>
  CommentReplyButton?: FC<CommentReplyButtonProps>
  Timestamp?: FC<TimestampProps>
}
