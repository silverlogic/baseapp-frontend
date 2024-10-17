import { FC } from 'react'

import type { SwipeableDrawerProps } from '@baseapp-frontend/design-system'

import type { CommentItem_comment$data } from '../../../../../__generated__/CommentItem_comment.graphql'
import type { CommentOption, LongPressHandler } from '../types'

export interface CommentOptionsProps {
  comment: CommentItem_comment$data
  longPressHandler: LongPressHandler
  onLongPressLeave: () => void
  isHoveringComment: boolean
  enableDelete: boolean
  onDelete?: () => void
  options?: CommentOption[]
  SwipeableDrawer?: FC<SwipeableDrawerProps>
  SwipeableDrawerProps?: Partial<SwipeableDrawerProps>
}
