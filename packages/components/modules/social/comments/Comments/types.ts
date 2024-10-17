import { FC } from 'react'

import { CommentsFragment$key } from '../../../../__generated__/CommentsFragment.graphql'
import { CommentCreateProps } from '../CommentCreate/types'
import { CommentsListProps } from '../CommentsList/types'

export interface CommentsProps {
  target: CommentsFragment$key
  profileId?: string
  subscriptionsEnabled?: boolean
  CommentsList?: FC<CommentsListProps>
  CommentsListProps?: Partial<CommentsListProps>
  CommentCreate?: FC<CommentCreateProps>
  CommentCreateProps?: Partial<CommentCreateProps>
  onCommentCreateFocus?: (ref: HTMLInputElement) => void
}
