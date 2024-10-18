import { LinkIcon, PenEditIcon, PinIcon } from '@baseapp-frontend/design-system'

import useCommentPinMutation from '../../graphql/mutations/CommentPin'
import { CommentOption } from '../types'
import { UseCommentOptionsParams } from './types'

const useCommentOptions = ({
  comment,
  onLongPressLeave,
  onEdit,
}: UseCommentOptionsParams): CommentOption[] => {
  const [pinComment, isPinningComment] = useCommentPinMutation()
  const handlePinComment = () => {
    pinComment({ variables: { id: comment!.id } })
    onLongPressLeave()
  }

  const handleEditComment = () => {
    onLongPressLeave()
    onEdit()
  }

  return [
    {
      disabled: true,
      icon: <LinkIcon />,
      label: 'Share Comment',
      onClick: onLongPressLeave,
      hasPermission: true,
    },
    {
      disabled: isPinningComment,
      icon: <PinIcon sx={{ color: comment?.isPinned ? 'info.main' : 'action.active' }} />,
      label: `${comment?.isPinned ? 'Unpin' : 'Pin'} Comment`,
      onClick: handlePinComment,
      hasPermission: comment?.canPin,
    },
    {
      disabled: false,
      icon: <PenEditIcon />,
      label: 'Edit Comment',
      onClick: handleEditComment,
      hasPermission: comment?.canChange,
    },
  ]
}

export default useCommentOptions
