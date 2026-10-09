import { PropsWithChildren } from 'react'

import { CommentItem_comment$data } from '../../../../../__generated__/CommentItem_comment.graphql'

export interface CommentActionsContextValue {
  /** Present the long-press action sheet for the given comment. */
  openCommentActions: (comment: CommentItem_comment$data) => void
  closeCommentActions: () => void
}

export interface CommentActionsProviderProps extends PropsWithChildren {
  /** Called after a successful pin/unpin — BaseComments re-sorts the list with it. */
  onPinToggled?: () => void
}
