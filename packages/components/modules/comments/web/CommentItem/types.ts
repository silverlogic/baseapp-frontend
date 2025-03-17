import type { FC } from 'react'

import type { BoxProps } from '@mui/material'

import type { CommentItem_comment$key } from '../../../../__generated__/CommentItem_comment.graphql'
import type { CommentItem_target$key } from '../../../../__generated__/CommentItem_target.graphql'
import type { ActionOverlayProps, TimestampProps } from '../../../__shared__/web'
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
  profilePath?: string
}

export interface CommentContainerWrapperProps extends BoxProps {
  currentThreadDepth: number
}
