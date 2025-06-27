import { FC, PropsWithChildren } from 'react'

import type { CommentsFragment$key } from '../../../../__generated__/CommentsFragment.graphql'
import type { CommentCreateProps } from '../CommentCreate/types'
import type { CommentsListProps } from '../CommentsList/types'

export interface CommentsProps extends PropsWithChildren {
  subscriptionsEnabled?: boolean
  target: CommentsFragment$key
  CommentsList?: FC<CommentsListProps>
  CommentsListProps?: Partial<CommentsListProps>
  CommentCreate?: FC<CommentCreateProps>
  CommentCreateProps?: Partial<CommentCreateProps>
}
