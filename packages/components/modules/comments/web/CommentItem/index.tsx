'use client'

import { FC, useState } from 'react'

import { ClickableAvatar } from '@baseapp-frontend/design-system/components/web/avatars'
import { Markdown } from '@baseapp-frontend/design-system/components/web/markdown'

import { Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useIntl } from 'react-intl'

import { ActionsOverlay, Timestamp as DefaultTimestamp } from '../../../__shared__/web'
import { FileUploadList } from '../../../files/web'
import { useCommentItem } from '../../common'
import DefaultCommentUpdate from '../CommentUpdate'
import DefaultCommentPinnedBadge from './CommentPinnedBadge'
import DefaultCommentReactionButton from './CommentReactionButton'
import DefaultCommentReplyButton from './CommentReplyButton'
import CommentsReplies from './CommentsReplies'
import {
  ActionsRow,
  CommentContainerWrapper,
  ContentContainer,
  CommentContainer as DefaultCommentContainer,
  FooterRow,
  NameRow,
  TitleContainer,
} from './styled'
import { CommentItemProps, CustomizableCommentItemProps } from './types'
import useCommentOptions from './useCommentOptions'

const CommentItem: FC<CommentItemProps> = ({
  comment: commentRef,
  currentThreadDepth,
  subscriptionsEnabled,
  onReplyClick,
  ...customizableProps
}) => {
  const {
    enableShare,
    ActionOverlayProps = {},
    CommentUpdateProps = {},
    CommentsRepliesProps = {},
    enableDelete = false,
    Timestamp = DefaultTimestamp,
    CommentUpdate = DefaultCommentUpdate,
    CommentReplyButton = DefaultCommentReplyButton,
    CommentPinnedBadge = DefaultCommentPinnedBadge,
    CommentReactionButton = DefaultCommentReactionButton,
    CommentContainer = DefaultCommentContainer,
    useProfileId = false,
    profilePath = '/profile',
  }: CustomizableCommentItemProps = customizableProps

  const {
    comment,
    commentItemRef,
    isRepliesExpanded,
    isLoadingReplies,
    showReplies,
    setAsReplyTarget,
    deleteComment,
    isDeletingComment,
    hasUser,
    totalCommentsCount,
    profileUrl,
  } = useCommentItem<HTMLDivElement>({ comment: commentRef, useProfileId, profilePath })
  const router = useRouter()
  const intl = useIntl()

  const [isEditMode, setIsEditMode] = useState(false)

  const defaultCommentOptions = useCommentOptions({
    comment,
    onEdit: () => setIsEditMode(true),
    enableShare,
  })

  const { actions = defaultCommentOptions, ...restOfActionOverlayProps } = ActionOverlayProps ?? {}

  const replyToComment = () => {
    if (hasUser) {
      onReplyClick?.()
      setAsReplyTarget()
    }
    showReplies()
  }

  const renderProfileName = () => {
    if (!hasUser)
      return (
        <Typography variant="subtitle2">
          {intl.formatMessage({ id: 'comments.item.deletedUser', defaultMessage: 'Deleted User' })}
        </Typography>
      )

    return (
      <Link href={profileUrl}>
        <Typography variant="subtitle2">{comment.profile?.name}</Typography>
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
      <Markdown sx={{ wordBreak: 'normal', overflowWrap: 'anywhere' }}>{comment.body}</Markdown>
    )
  }

  if (!comment) {
    return null
  }

  return (
    <div>
      <CommentContainerWrapper currentThreadDepth={currentThreadDepth}>
        <ActionsOverlay
          actions={actions}
          showDeleteButton={enableDelete && comment.canDelete}
          handleDeleteItem={deleteComment}
          isDeletingItem={isDeletingComment}
          title={intl.formatMessage({
            id: 'comments.item.actionsOverlay.title',
            defaultMessage: 'Comment',
          })}
          {...restOfActionOverlayProps}
          ref={commentItemRef}
        >
          <CommentContainer>
            <ClickableAvatar
              deletedUser={!hasUser}
              width={40}
              height={40}
              alt={
                comment.profile?.name ??
                intl.formatMessage({
                  id: 'comments.item.avatar.alt',
                  defaultMessage: "Comment's user avatar",
                })
              }
              src={comment.profile?.image || ''}
              onClick={() => router.push(profileUrl)}
            />

            <ContentContainer>
              <TitleContainer>
                <NameRow>
                  {renderProfileName()}
                  <CommentPinnedBadge isPinned={comment.isPinned} />
                </NameRow>
                {renderCommentContent()}

                <div>
                  <FileUploadList
                    target={comment}
                    variant="chips"
                    layout="horizontal"
                    editable={isEditMode}
                  />
                </div>
              </TitleContainer>
              <FooterRow>
                <ActionsRow>
                  <CommentReactionButton target={comment} />
                  <CommentReplyButton
                    onReply={replyToComment}
                    isLoadingReplies={isLoadingReplies}
                    commentId={comment.id}
                    totalCommentsCount={totalCommentsCount}
                    isDisabled={!hasUser && (totalCommentsCount ?? 0) === 0}
                  />
                </ActionsRow>
                <Timestamp date={comment.created} />
              </FooterRow>
            </ContentContainer>
          </CommentContainer>
        </ActionsOverlay>
      </CommentContainerWrapper>
      {isRepliesExpanded && !isLoadingReplies && (
        <CommentsReplies
          key={`replies-of-${comment.id}`}
          target={comment}
          currentThreadDepth={currentThreadDepth + 1}
          subscriptionsEnabled={subscriptionsEnabled}
          onReplyClick={onReplyClick}
          CommentItem={CommentItem}
          // Make sure the replies are also customizable with the same props as the parent comment item
          CommentItemProps={customizableProps}
          {...CommentsRepliesProps}
        />
      )}
    </div>
  )
}

export default CommentItem
