import { ReactNode } from 'react'

import {
  LinkIcon,
  PenEditIcon,
  PinIcon,
} from '@baseapp-frontend/design-system/components/web/icons'

import { OverlayAction } from '../../../../__shared__/web'
import { CommentActionId, useCommentActions } from '../../../common'
import { UseCommentOptionsParams } from './types'

/**
 * Thin adapter mapping the shared, headless `useCommentActions` descriptors to the web
 * `ActionsOverlay` action shape — only the icons are decided here.
 */
const useCommentOptions = ({
  comment,
  onEdit,
  enableShare = true,
}: UseCommentOptionsParams): OverlayAction[] => {
  const actions = useCommentActions({ comment, onEdit, enableShare })

  const iconByActionId: Partial<Record<CommentActionId, ReactNode>> = {
    share: <LinkIcon />,
    pin: <PinIcon sx={{ color: comment?.isPinned ? 'info.main' : 'action.active' }} />,
    edit: <PenEditIcon />,
  }

  return actions.map((action) => ({
    disabled: !!action.disabled,
    icon: iconByActionId[action.id],
    label: action.label,
    onClick: action.onSelect,
    hasPermission: action.hasPermission,
    closeOnClick: action.closeOnSelect ?? true,
  }))
}

export default useCommentOptions
