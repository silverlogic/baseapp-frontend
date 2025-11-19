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

  return [
    {
      disabled: true,
      icon: <LinkIcon />,
      label: intl.formatMessage({ id: 'comments.actions.share' }),
      onClick: () => {},
      hasPermission: true,
      closeOnClick: true,
    },
    {
      disabled: isPinningComment,
      icon: <PinIcon sx={{ color: comment?.isPinned ? 'info.main' : 'action.active' }} />,
      label: intl.formatMessage({
        id: comment?.isPinned ? 'comments.actions.unpin' : 'comments.actions.pin',
      }),
      onClick: handlePinComment,
      hasPermission: comment?.canPin,
      closeOnClick: true,
    },
    {
      disabled: false,
      icon: <PenEditIcon />,
      label: intl.formatMessage({ id: 'comments.actions.edit' }),
      onClick: handleEditComment,
      hasPermission: comment?.canChange,
      closeOnClick: true,
    },
  ]
}

export default useCommentOptions
