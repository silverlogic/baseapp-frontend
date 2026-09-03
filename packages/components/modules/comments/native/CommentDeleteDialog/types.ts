export interface ICommentDeleteDialogProps {
  visible: boolean
  onClose: () => void
  /** Called only when the deletion succeeds, before `onClose`. */
  onDeleted?: () => void
  commentId: string
}
