import { FC } from 'react'

import type { CommentsFragment$key } from '../../../../__generated__/CommentsFragment.graphql'
import type { CommentCreateProps } from '../CommentCreate/types'
import type { CommentsListProps } from '../CommentsList/types'

export interface CommentsProps {
  target: CommentsFragment$key
  subscriptionsEnabled?: boolean
  CommentsList?: FC<CommentsListProps>
  CommentsListProps?: Partial<CommentsListProps>
  CommentCreate?: FC<CommentCreateProps>
  CommentCreateProps?: Partial<CommentCreateProps>
  onCommentCreateFocus?: (ref: HTMLInputElement) => void
}
