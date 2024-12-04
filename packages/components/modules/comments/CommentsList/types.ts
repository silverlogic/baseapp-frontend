import type { FC } from 'react'

import type { VirtuosoProps } from 'react-virtuoso'

import { CommentsList_comments$key } from '../../../__generated__/CommentsList_comments.graphql'
import type { CommentItemProps } from '../CommentItem/types'

export interface CommentsListProps {
  target: CommentsList_comments$key
  subscriptionsEnabled: boolean
  onReplyClick?: () => void
  CommentItem?: FC<CommentItemProps>
  CommentItemProps?: Partial<CommentItemProps>
  VirtuosoProps?: Partial<VirtuosoProps<any, any>>
}
