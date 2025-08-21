'use client'

import { FC, useRef, useState, useTransition } from 'react'

import { ClickableAvatar } from '@baseapp-frontend/design-system/components/web/avatars'

import { Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRefetchableFragment } from 'react-relay'

import { CommentItemRefetchQuery } from '../../../../__generated__/CommentItemRefetchQuery.graphql'
import { CommentItem_comment$key } from '../../../../__generated__/CommentItem_comment.graphql'
import { ActionsOverlay, Timestamp as DefaultTimestamp } from '../../../__shared__/web'
import { CommentItemFragmentQuery, useCommentDeleteMutation, useCommentReply } from '../../common'
import DefaultCommentUpdate from '../CommentUpdate'
import DefaultCommentPinnedBadge from './CommentPinnedBadge'
import DefaultCommentReactionButton from './CommentReactionButton'
import DefaultCommentReplyButton from './CommentReplyButton'
import CommentsReplies from './CommentsReplies'
import { CommentContainer, CommentContainerWrapper } from './styled'
import { CommentItemProps } from './types'
import useCommentOptions from './useCommentOptions'

const CommentItem: FC<CommentItemProps> = ({
  comment: commentRef,
  currentThreadDepth,
  subscriptionsEnabled,
  onReplyClick,
  CommentUpdateProps,
  CommentsRepliesProps,
  ActionOverlayProps,
  enableDelete = false,
  Timestamp = DefaultTimestamp,
  CommentUpdate = DefaultCommentUpdate,
  CommentReplyButton = DefaultCommentReplyButton,
  CommentPinnedBadge = DefaultCommentPinnedBadge,
  CommentReactionButton = DefaultCommentReactionButton,
  profilePath = '/profile',
}) => {
  const [comment, refetchCommentItem] = useRefetchableFragment<
    CommentItemRefetchQuery,
    CommentItem_comment$key
  >(CommentItemFragmentQuery, commentRef)
  const { setCommentReply } = useCommentReply()
  const router = useRouter()

  const commentItemRef = useRef<HTMLDivElement | undefined>(undefined)

  const [isEditMode, setIsEditMode] = useState(false)
  const [isReplyExpanded, setIsReplyExpanded] = useState(false)

  const defaultCommentOptions = useCommentOptions({
    comment,
    onEdit: () => setIsEditMode(true),
  })

  const { actions = defaultCommentOptions, ...restOfActionOverlayProps } = ActionOverlayProps ?? {}

  const [isLoadingReplies, startLoadingReplies] = useTransition()

  const { resetCommentReply } = useCommentReply()

  const [deleteComment, isDeletingComment] = useCommentDeleteMutation()

  const profileUrl = `${profilePath}/${comment?.user?.pk}`
  const hasUser = Boolean(comment.user)

  const showReplies = () => {
    if (isReplyExpanded) return

    startLoadingReplies(() => {
      refetchCommentItem(
        { isRepliesExpanded: true },
        {
          fetchPolicy: 'store-or-network',
          onComplete: (error) => {
            if (error) {
              // eslint-disable-next-line no-console
              console.error(error)
            } else {
              setIsReplyExpanded(true)
            }
          },
        },
      )
    })
  }

  const replyToComment = () => {
    if (hasUser) {
      onReplyClick?.()
      setCommentReply({
        commentItemRef,
        inReplyToId: comment.id,
        name: comment.user?.fullName,
      })
    }
    showReplies()
  }

  const renderUserName = () => {
    if (!hasUser) return <Typography variant="subtitle2">Deleted User</Typography>

    return (
      <Link href={profileUrl}>
        <Typography variant="subtitle2">{comment.user?.fullName}</Typography>
      </Link>
    )
  }
  const renderCommentContent = () => {
    if (isEditMode)
      return (
        <CommentUpdate
          comment={comment}
          onCancel={() => setIsEditMode(false)}
          {...CommentUpdateProps}
        />
      )

    return (
      <Typography
        variant="body2"
        sx={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'normal',
          overflowWrap: 'anywhere',
        }}
      >
        {comment.body}
      </Typography>
    )
  }

  if (!comment) {
    return null
  }

  const handleDeleteComment = () => {
    deleteComment({ variables: { id: comment.id } })
    resetCommentReply()
  }

  return (
    <div>
      <CommentContainerWrapper currentThreadDepth={currentThreadDepth}>
        <ActionsOverlay
          actions={actions}
          showDeleteButton={enableDelete && comment.canDelete}
          handleDeleteItem={handleDeleteComment}
          isDeletingItem={isDeletingComment}
          title="Comment"
          {...restOfActionOverlayProps}
          ref={commentItemRef}
        >
          <CommentContainer>
            <ClickableAvatar
              deletedUser={!hasUser}
              width={40}
              height={40}
              alt={comment.user?.fullName ?? `Comment's user avatar`}
              src={comment.user?.avatar?.url}
              onClick={() => router.push(profileUrl)}
            />

            <div className="grid gap-3">
              <div className="grid grid-cols-1 justify-start">
                <div className="grid grid-cols-[repeat(2,max-content)] items-center gap-2">
                  {renderUserName()}
                  <CommentPinnedBadge isPinned={comment.isPinned} />
                </div>
                {renderCommentContent()}
              </div>
              <div className="flex justify-between">
                <div className="grid grid-cols-[repeat(2,max-content)] gap-4">
                  <CommentReactionButton target={comment} />
                  <CommentReplyButton
                    onReply={replyToComment}
                    isLoadingReplies={isLoadingReplies}
                    commentId={comment.id}
                    totalCommentsCount={comment.commentsCount.total}
                  />
                </div>
                <Timestamp date={comment.created} />
              </div>
            </div>
          </CommentContainer>
        </ActionsOverlay>
      </CommentContainerWrapper>
      {isReplyExpanded && !isLoadingReplies && (
        <CommentsReplies
          key={`replies-of-${comment.id}`}
          target={comment}
          currentThreadDepth={currentThreadDepth + 1}
          subscriptionsEnabled={subscriptionsEnabled}
          onReplyClick={onReplyClick}
          CommentItem={CommentItem}
          {...CommentsRepliesProps}
        />
      )}
    </div>
  )
}

export default CommentItem
