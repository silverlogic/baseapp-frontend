import { FC, PropsWithChildren } from 'react'

import type { CommentsFragment$key } from '../../../../__generated__/CommentsFragment.graphql'
import type { CommentContainerProps } from '../CommentContainer/types'
import type { CommentsListProps } from '../CommentsList/types'

export interface CommentsProps extends PropsWithChildren {
  subscriptionsEnabled?: boolean
  target: CommentsFragment$key
  CommentsList?: FC<CommentsListProps>
  CommentsListProps?: Partial<CommentsListProps>
  CommentContainer?: FC<CommentContainerProps>
  CommentContainerProps?: Partial<CommentContainerProps>
}
