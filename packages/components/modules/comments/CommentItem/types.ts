import type { FC } from 'react'

import type { BoxProps } from '@mui/material'

import { CommentItem_comment$key } from '../../../__generated__/CommentItem_comment.graphql'
import { CommentItem_target$key } from '../../../__generated__/CommentItem_target.graphql'
import { ActionOverlayProps } from '../../__shared__/ActionsOverlay/types'
import type { TimestampProps } from '../../__shared__/Timestamp/types'
import type { CommentUpdateProps } from '../CommentUpdate/types'
import type { CommentPinnedBadgeProps } from './CommentPinnedBadge/types'
import type { CommentReactionButtonProps } from './CommentReactionButton/types'
import type { CommentReplyButtonProps } from './CommentReplyButton/types'
import type { CommentsRepliesProps } from './CommentsReplies/types'

export type CommentOption = {
  label: string
  icon: JSX.Element
  onClick: () => void
  disabled: boolean
  hasPermission?: boolean | null
}

export interface CommentItemProps {
  comment: CommentItem_comment$key
  target: CommentItem_target$key
  profileId?: string
  currentThreadDepth: number
  subscriptionsEnabled: boolean
  onReplyClick?: () => void
  enableDelete?: boolean
  ActionOverlayProps?: Partial<ActionOverlayProps>
  CommentUpdate?: FC<CommentUpdateProps>
  CommentUpdateProps?: Partial<CommentUpdateProps>
  CommentsRepliesProps?: Partial<CommentsRepliesProps>
  CommentReactionButton?: FC<CommentReactionButtonProps>
  CommentReplyButton?: FC<CommentReplyButtonProps>
  CommentPinnedBadge?: FC<CommentPinnedBadgeProps>
  Timestamp?: FC<TimestampProps>
}

export interface CommentContainerWrapperProps extends BoxProps {
  currentThreadDepth: number
}

export type LongPressHandler = {
  isLongPressingComment: boolean
  shouldOpenCommentOptions: boolean
}
