import { useCallback, useEffect, useRef, useState, useTransition } from 'react'

import { useRefetchableFragment } from 'react-relay'

import { CommentItemRefetchQuery } from '../../../../../__generated__/CommentItemRefetchQuery.graphql'
import { CommentItem_comment$key } from '../../../../../__generated__/CommentItem_comment.graphql'
import useCommentReply from '../../context/useCommentReply'
import { useCommentDeleteMutation } from '../../graphql/mutations/CommentDelete'
import { CommentItemFragmentQuery } from '../../graphql/queries/CommentItem'
import { UseCommentItemOptions, UseCommentItemReturn } from './types'

/**
 * The per-comment state machine shared by web and native `CommentItem`s: replies
 * expansion (including the reply-success auto-expand signal from `useCommentCreateForm`),
 * reply targeting via the `CommentReplyProvider` store, and deletion.
 */
const useCommentItem = <TElement = unknown>({
  comment: commentRef,
  threadDepth = 0,
  maxThreadDepth = Infinity,
}: UseCommentItemOptions): UseCommentItemReturn<TElement> => {
  const [comment, refetchCommentItem] = useRefetchableFragment<
    CommentItemRefetchQuery,
    CommentItem_comment$key
  >(CommentItemFragmentQuery, commentRef)

  const { commentIdToExpand, setCommentIdToExpand, setCommentReply, resetCommentReply } =
    useCommentReply<TElement>()

  const commentItemRef = useRef<TElement | undefined>(undefined)
  const [isRepliesExpanded, setIsRepliesExpanded] = useState(false)
  const [isLoadingReplies, startLoadingReplies] = useTransition()
  const [commitDelete, isDeletingComment] = useCommentDeleteMutation()

  const totalCommentsCount = comment?.commentsCount?.total ?? 0
  const hasReplies = totalCommentsCount > 0
  const hasUser = Boolean(comment?.user)
  const canReply = threadDepth < maxThreadDepth

  const expandReplies = useCallback(
    (fetchPolicy: 'store-or-network' | 'network-only') => {
      startLoadingReplies(() => {
        refetchCommentItem(
          { isRepliesExpanded: true },
          {
            fetchPolicy,
            onComplete: (error) => {
              if (error) {
                // eslint-disable-next-line no-console
                console.error('Error loading replies:', error)
              } else {
                setIsRepliesExpanded(true)
              }
            },
          },
        )
      })
    },
    [refetchCommentItem],
  )

  const showReplies = useCallback(() => {
    if (isRepliesExpanded) return
    expandReplies('store-or-network')
  }, [isRepliesExpanded, expandReplies])

  const hideReplies = useCallback(() => {
    setIsRepliesExpanded(false)
  }, [])

  // Consume-once: expand this comment's thread right after one of its replies is created
  // (`useCommentCreateForm` with `expandRepliesOnSuccess` sets the signal).
  useEffect(() => {
    if (commentIdToExpand !== comment?.id) return
    if (!isRepliesExpanded && hasReplies) {
      expandReplies('network-only')
    }
    setCommentIdToExpand(null)
  }, [
    commentIdToExpand,
    comment?.id,
    isRepliesExpanded,
    hasReplies,
    expandReplies,
    setCommentIdToExpand,
  ])

  const setAsReplyTarget = () => {
    if (!hasUser) return
    setCommentReply({
      commentItemRef,
      inReplyToId: comment.id,
      name: comment.profile?.name,
    })
  }

  const deleteComment = () => {
    commitDelete({ variables: { id: comment.id } })
    resetCommentReply()
  }

  return {
    comment,
    refetchCommentItem,
    commentItemRef,
    isRepliesExpanded,
    isLoadingReplies,
    showReplies,
    hideReplies,
    setAsReplyTarget,
    deleteComment,
    isDeletingComment,
    hasUser,
    hasReplies,
    totalCommentsCount,
    canReply,
  }
}

export default useCommentItem
