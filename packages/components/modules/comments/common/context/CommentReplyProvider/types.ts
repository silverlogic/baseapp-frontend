import { RefObject } from 'react'

export type CommentReplyState = {
  commentItemRef?: RefObject<HTMLDivElement | undefined>
  inReplyToId?: string
  name?: string | null
}

type CommentReplyFunctions = {
  setCommentReply: (state: CommentReplyState) => void
  resetCommentReply: () => void
}

export type UseCommentReply = CommentReplyState & CommentReplyFunctions
