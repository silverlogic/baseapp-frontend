import { RefObject } from 'react'

export type CommentEditTarget = {
  id: string
  body?: string | null
  mentionedProfileIds?: string[]
}

export type CommentReplyState<TElement = unknown> = {
  commentItemRef?: RefObject<TElement | undefined>
  inReplyToId?: string
  name?: string | null
}

export type CommentComposerState<TElement = unknown> = CommentReplyState<TElement> & {
  editingComment?: CommentEditTarget | null
  commentIdToExpand?: string | null
}

type CommentComposerFunctions<TElement = unknown> = {
  setCommentReply: (state: CommentReplyState<TElement>) => void
  resetCommentReply: () => void
  setCommentEdit: (target: CommentEditTarget) => void
  resetCommentEdit: () => void
  setCommentIdToExpand: (id: string | null) => void
}

export type UseCommentReply<TElement = unknown> = CommentComposerState<TElement> &
  CommentComposerFunctions<TElement>
