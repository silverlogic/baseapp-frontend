import type { FC } from 'react'

import type { VirtuosoProps } from 'react-virtuoso'

import { CommentsList_comments$key } from '../../../../__generated__/CommentsList_comments.graphql'
import type { CommentItemProps } from '../types'

export interface CommentsRepliesProps {
  target: CommentsList_comments$key
  profileId?: string
  currentThreadDepth: number
  subscriptionsEnabled: boolean
  onReplyClick?: () => void
  CommentItem: FC<CommentItemProps>
  VirtuosoProps?: Partial<VirtuosoProps<any, any>>
}
