import { useCommentPinMutation } from '../../graphql/mutations/CommentPin'
import { CommentAction, UseCommentActionsOptions } from './types'

/**
 * Headless comment action descriptors (share / pin / edit / delete): labels, permission
 * gating, and the pin mutation live here; platforms map the descriptors to their own menu
 * UI and icons (web `useCommentOptions` → ActionsOverlay; native `CommentActionSheet`).
 */
const useCommentActions = ({
  comment,
  onEdit,
  onDelete,
  onPinToggled,
  enableShare = true,
  shareDisabled = true,
}: UseCommentActionsOptions): CommentAction[] => {
  const [pinComment, isPinningComment] = useCommentPinMutation()

  const handlePinComment = () => {
    if (!comment) return
    pinComment({
      variables: { id: comment.id },
      onCompleted: (_response, errors) => {
        if (!errors) onPinToggled?.()
      },
    })
  }

  return [
    {
      id: 'share',
      label: 'Share Comment',
      hasPermission: enableShare,
      disabled: shareDisabled,
      closeOnSelect: true,
      onSelect: () => {},
    },
    {
      id: 'pin',
      label: `${comment?.isPinned ? 'Unpin' : 'Pin'} Comment`,
      hasPermission: comment?.canPin,
      disabled: isPinningComment,
      closeOnSelect: true,
      onSelect: handlePinComment,
    },
    {
      id: 'edit',
      label: 'Edit Comment',
      hasPermission: comment?.canChange,
      disabled: false,
      closeOnSelect: true,
      onSelect: onEdit,
    },
    ...(onDelete
      ? [
          {
            id: 'delete' as const,
            label: 'Delete Comment',
            hasPermission: comment?.canDelete,
            disabled: false,
            isDestructive: true,
            closeOnSelect: true,
            onSelect: onDelete,
          },
        ]
      : []),
  ]
}

export default useCommentActions
