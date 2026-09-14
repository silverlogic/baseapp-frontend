import { CommentItem_comment$data } from '../../../../../__generated__/CommentItem_comment.graphql'

export type CommentActionId = 'share' | 'pin' | 'edit' | 'delete'

export interface CommentAction {
  id: CommentActionId
  label: string
  hasPermission?: boolean | null
  disabled?: boolean
  /** Rendered apart and in error color (e.g. native's divided delete section). */
  isDestructive?: boolean
  closeOnSelect?: boolean
  onSelect: () => void
}

export interface UseCommentActionsOptions {
  comment?: Pick<
    CommentItem_comment$data,
    'id' | 'isPinned' | 'canPin' | 'canChange' | 'canDelete'
  > | null
  onEdit: () => void
  /** When provided, a delete action is emitted (native's action sheet; web's ActionsOverlay owns delete). */
  onDelete?: () => void
  /** Called after a successful pin/unpin — native re-sorts the list; web passes nothing. */
  onPinToggled?: () => void
  enableShare?: boolean
  shareDisabled?: boolean
}
