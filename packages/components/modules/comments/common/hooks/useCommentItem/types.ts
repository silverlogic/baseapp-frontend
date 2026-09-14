import { RefObject } from 'react'

import { RefetchFnDynamic } from 'react-relay'

import { CommentItemRefetchQuery } from '../../../../../__generated__/CommentItemRefetchQuery.graphql'
import {
  CommentItem_comment$data,
  CommentItem_comment$key,
} from '../../../../../__generated__/CommentItem_comment.graphql'

export interface UseCommentItemOptions {
  comment: CommentItem_comment$key
  /** 1-based on web, 0-based on native — only the difference to `maxThreadDepth` matters. */
  threadDepth?: number
  /** Depth at which replying is disabled. Web leaves it unbounded; native caps at DEFAULT_MAX_THREAD_DEPTH. */
  maxThreadDepth?: number
  /** Force id-based profile URLs even when the profile has a `urlPath`. */
  useProfileId?: boolean
  /** Prefix for id-based profile URLs. */
  profilePath?: string
}

export interface UseCommentItemReturn<TElement = unknown> {
  comment: CommentItem_comment$data
  refetchCommentItem: RefetchFnDynamic<CommentItemRefetchQuery, CommentItem_comment$key>
  commentItemRef: RefObject<TElement | undefined>
  isRepliesExpanded: boolean
  isLoadingReplies: boolean
  showReplies: () => void
  hideReplies: () => void
  setAsReplyTarget: () => void
  deleteComment: () => void
  isDeletingComment: boolean
  hasUser: boolean
  hasReplies: boolean
  totalCommentsCount: number
  canReply: boolean
  /** The comment author's profile URL: `urlPath` when available, else `${profilePath}/${id}`. */
  profileUrl: string
}
