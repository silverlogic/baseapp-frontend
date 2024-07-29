import { RefObject } from 'react'

export type CommentReplyState = {
  commentItemRef?: RefObject<HTMLDivElement>
  inReplyToId?: string
  name?: string | null
}

type CommentReplyFunctions = {
  setCommentReply: (
    partial:
      | Partial<CommentReplyState>
      | ((state: CommentReplyState) => Partial<CommentReplyState>),
    replace?: boolean | undefined,
  ) => void
  resetCommentReply: () => void
}

export type UseCommentReply = CommentReplyState & CommentReplyFunctions
