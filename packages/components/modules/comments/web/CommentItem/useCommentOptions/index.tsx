import { ReactNode } from 'react'

import {
  LinkIcon,
  PenEditIcon,
  PinIcon,
} from '@baseapp-frontend/design-system/components/web/icons'

import { useIntl } from 'react-intl'

import { OverlayAction } from '../../../../__shared__/web'
import { CommentActionId, useCommentActions } from '../../../common'
import { COMMENT_ACTION_MESSAGES } from './constants'
import { UseCommentOptionsParams } from './types'

/**
 * Thin adapter mapping the shared, headless `useCommentActions` descriptors to the web
 * `ActionsOverlay` action shape — only the icons and translated labels are decided here.
 */
const useCommentOptions = ({
  comment,
  onEdit,
  enableShare = true,
}: UseCommentOptionsParams): OverlayAction[] => {
  const intl = useIntl()
  const actions = useCommentActions({ comment, onEdit, enableShare })

  const iconByActionId: Partial<Record<CommentActionId, ReactNode>> = {
    share: <LinkIcon />,
    pin: <PinIcon sx={{ color: comment?.isPinned ? 'info.main' : 'action.active' }} />,
    edit: <PenEditIcon />,
  }

  const labelByActionId: Record<CommentActionId, string> = {
    share: intl.formatMessage(COMMENT_ACTION_MESSAGES.share),
    pin: intl.formatMessage(
      comment?.isPinned ? COMMENT_ACTION_MESSAGES.unpin : COMMENT_ACTION_MESSAGES.pin,
    ),
    edit: intl.formatMessage(COMMENT_ACTION_MESSAGES.edit),
    delete: intl.formatMessage(COMMENT_ACTION_MESSAGES.delete),
  }

  return actions.map((action) => ({
    disabled: !!action.disabled,
    icon: iconByActionId[action.id],
    label: labelByActionId[action.id],
    onClick: action.onSelect,
    hasPermission: action.hasPermission,
    closeOnClick: action.closeOnSelect ?? true,
  }))
}

export default useCommentOptions
