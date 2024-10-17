'use client'

import { FC, useRef, useState, useTransition } from 'react'

import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system'

import { Typography } from '@mui/material'
import { useRefetchableFragment } from 'react-relay'
import { LongPressCallbackReason, useLongPress } from 'use-long-press'

import { CommentItemRefetchQuery } from '../../../../__generated__/CommentItemRefetchQuery.graphql'
import { CommentItem_comment$key } from '../../../../__generated__/CommentItem_comment.graphql'
import DefaultTimestamp from '../../Timestamp'
import { CommentItemFragmentQuery } from '../../graphql/queries/CommentItem'
import DefaultCommentUpdate from '../CommentUpdate'
import { useCommentReply } from '../context'
import CommentOptions from './CommentOptions'
import DefaultCommentPinnedBadge from './CommentPinnedBadge'
import DefaultCommentReactionButton from './CommentReactionButton'
import DefaultCommentReplyButton from './CommentReplyButton'
import CommentsReplies from './CommentsReplies'
import { CommentContainer, CommentContainerWrapper } from './styled'
import { CommentItemProps, LongPressHandler } from './types'
import useCommentOptions from './useCommentOptions'

const CommentItem: FC<CommentItemProps> = ({
  comment: commentRef,
  profileId,
  currentThreadDepth,
  subscriptionsEnabled,
  onReplyClick,
  CommentUpdateProps,
  CommentsRepliesProps,
  CommentOptionsProps,
  enableDelete = true,
  Timestamp = DefaultTimestamp,
  CommentUpdate = DefaultCommentUpdate,
  CommentReplyButton = DefaultCommentReplyButton,
  CommentPinnedBadge = DefaultCommentPinnedBadge,
  CommentReactionButton = DefaultCommentReactionButton,
}) => {
  const [comment, refetchCommentItem] = useRefetchableFragment<
    CommentItemRefetchQuery,
    CommentItem_comment$key
  >(CommentItemFragmentQuery, commentRef)
  const { setCommentReply } = useCommentReply()
  const commentItemRef = useRef<HTMLDivElement>(null)

  const [isHoveringComment, setIsHoveringComment] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isRepliesExpanded, setIsReplyRepliesExpanded] = useState(false)

  const [longPressHandler, setLongPressHandler] = useState<LongPressHandler>({
    isLongPressingComment: false,
    shouldOpenCommentOptions: false,
  })

  const longPressHandlers = useLongPress<HTMLDivElement>(
    () => setLongPressHandler({ isLongPressingComment: true, shouldOpenCommentOptions: true }),
    {
      onCancel: (e, { reason }) => {
        // This is a workaround to prevent the comment options's drawer from closing when the user clicks on the drawer's content.
        // Ideally, we would call setLongPressHandler({ isLongPressingComment: false }) on `onFinished` instead of `onCancel`.
        // But, on mobile google chrome devices, the long press click is being wrongly propagated to the backdrop and closing the comment options's drawer right after it opens.
        const className = (e?.target as HTMLElement)?.className || ''
        const classNameString = typeof className === 'string' ? className : ''
        const isClickOnBackdrop = classNameString.includes('MuiBackdrop')
        if (reason === LongPressCallbackReason.CancelledByRelease && isClickOnBackdrop) {
          setLongPressHandler((prevState) => ({ ...prevState, isLongPressingComment: false }))
        }
      },
      cancelOutsideElement: true,
      threshold: 400,
    },
  )
  const handleLongPressCommentOptionsClose = () => {
    setLongPressHandler({ isLongPressingComment: false, shouldOpenCommentOptions: false })
  }

  const defaultCommentOptions = useCommentOptions({
    comment,
    onLongPressLeave: handleLongPressCommentOptionsClose,
    onEdit: () => setIsEditMode(true),
  })

  const [isLoadingReplies, startLoadingReplies] = useTransition()

  const showReplies = () => {
    if (isRepliesExpanded) return

    startLoadingReplies(() => {
      refetchCommentItem(
        { isRepliesExpanded: true },
        {
          fetchPolicy: 'store-or-network',
          onComplete: (error) => {
            if (error) {
              console.error(error)
            } else {
              setIsReplyRepliesExpanded(true)
            }
          },
        },
      )
    })
  }

  const replyToComment = () => {
    onReplyClick?.()
    setCommentReply({
      commentItemRef,
      inReplyToId: comment.id,
      name: comment.user?.fullName,
    })
    showReplies()
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

  const { options = defaultCommentOptions, ...restOfCommentOptionsProps } =
    CommentOptionsProps ?? {}

  return (
    <div>
      <CommentContainerWrapper currentThreadDepth={currentThreadDepth}>
        <CommentContainer
          ref={commentItemRef}
          onMouseEnter={() => setIsHoveringComment(true)}
          onMouseLeave={() => setIsHoveringComment(false)}
          {...longPressHandlers()}
        >
          <CommentOptions
            comment={comment}
            options={options}
            isHoveringComment={isHoveringComment}
            onLongPressLeave={handleLongPressCommentOptionsClose}
            longPressHandler={longPressHandler}
            enableDelete={enableDelete}
            {...restOfCommentOptionsProps}
          />
          <AvatarWithPlaceholder
            width={40}
            height={40}
            alt={comment.user?.fullName ?? `Comment's user avatar`}
            src={comment.user?.avatar?.url}
          />
          <div className="grid gap-3">
            <div className="grid grid-cols-1 justify-start">
              <div className="grid grid-cols-[repeat(2,max-content)] items-center gap-2">
                <Typography variant="subtitle2">{comment.user?.fullName}</Typography>
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
      </CommentContainerWrapper>
      {isRepliesExpanded && !isLoadingReplies && (
        <CommentsReplies
          key={`replies-of-${comment.id}`}
          target={comment}
          profileId={profileId}
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
