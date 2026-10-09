import type { UploadSource } from '../../../files/common'

export interface CommentFilesUpsertActionsProps {
  /** Uploads the picked files (deferred attach happens after the comment is created). */
  onFilesSelected: (files: UploadSource[]) => void
  disabled?: boolean
  shouldUseBottomSheetSafeComponents?: boolean
}
