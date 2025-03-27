import type { FC } from 'react'

import type { CommentsList_comments$key } from '../../../../__generated__/CommentsList_comments.graphql'
import type { CommentItemProps } from '../CommentItem/types'

export interface CommentsListProps {
  target: CommentsList_comments$key
  subscriptionsEnabled: boolean
  CommentItem?: FC<CommentItemProps>
  CommentItemProps?: Partial<CommentItemProps>
}
