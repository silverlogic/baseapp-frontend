import {
  LinkIcon,
  PenEditIcon,
  PinIcon,
} from '@baseapp-frontend/design-system/components/web/icons'

import { useIntl } from 'react-intl'

import { OverlayAction } from '../../../../__shared__/web'
import { useCommentPinMutation } from '../../../common'
import { UseCommentOptionsParams } from './types'

const useCommentOptions = ({ comment, onEdit }: UseCommentOptionsParams): OverlayAction[] => {
  const intl = useIntl()
  const [pinComment, isPinningComment] = useCommentPinMutation()
  const handlePinComment = () => {
    pinComment({ variables: { id: comment!.id } })
  }

  const handleEditComment = () => {
    onEdit()
  }

  // Extract pin/unpin messages separately to allow formatjs to detect both IDs
  const pinMessage = intl.formatMessage({
    id: 'comments.actions.pin',
    defaultMessage: 'Pin Comment',
  })
  const unpinMessage = intl.formatMessage({
    id: 'comments.actions.unpin',
    defaultMessage: 'Unpin Comment',
  })

  return [
    {
      disabled: true,
      icon: <LinkIcon />,
      label: intl.formatMessage({
        id: 'comments.actions.share',
        defaultMessage: 'Share Comment',
      }),
      onClick: () => {},
      hasPermission: true,
      closeOnClick: true,
    },
    {
      disabled: isPinningComment,
      icon: <PinIcon sx={{ color: comment?.isPinned ? 'info.main' : 'action.active' }} />,
      label: comment?.isPinned ? unpinMessage : pinMessage,
      onClick: handlePinComment,
      hasPermission: comment?.canPin,
      closeOnClick: true,
    },
    {
      disabled: false,
      icon: <PenEditIcon />,
      label: intl.formatMessage({
        id: 'comments.actions.edit',
        defaultMessage: 'Edit Comment',
      }),
      onClick: handleEditComment,
      hasPermission: comment?.canChange,
      closeOnClick: true,
    },
  ]
}

export default useCommentOptions
