import {
  LinkIcon,
  PenEditIcon,
  PinIcon,
} from '@baseapp-frontend/design-system/components/web/icons'

import { OverlayAction } from '../../../../__shared__/web'
import { useCommentPinMutation } from '../../../common'
import { UseCommentOptionsParams } from './types'

const useCommentOptions = ({ comment, onEdit }: UseCommentOptionsParams): OverlayAction[] => {
  const [pinComment, isPinningComment] = useCommentPinMutation()
  const handlePinComment = () => {
    pinComment({ variables: { id: comment!.id } })
  }

  const handleEditComment = () => {
    onEdit()
  }

  return [
    {
      disabled: true,
      icon: <LinkIcon />,
      label: 'Share Comment',
      onClick: () => {},
      hasPermission: true,
      closeOnClick: true,
    },
    {
      disabled: isPinningComment,
      icon: <PinIcon sx={{ color: comment?.isPinned ? 'info.main' : 'action.active' }} />,
      label: `${comment?.isPinned ? 'Unpin' : 'Pin'} Comment`,
      onClick: handlePinComment,
      hasPermission: comment?.canPin,
      closeOnClick: true,
    },
    {
      disabled: false,
      icon: <PenEditIcon />,
      label: 'Edit Comment',
      onClick: handleEditComment,
      hasPermission: comment?.canChange,
      closeOnClick: true,
    },
  ]
}

export default useCommentOptions
