type Accept = Record<string, string[]>

export interface CommentFilesUpsertActionsProps {
  /** Uploads the picked files (deferred attach happens after the comment is created). */
  onFilesSelected: (files: File[]) => void
  /** Shows the attach button in a loading state while uploads are in flight. */
  isUploading?: boolean
  maxFiles?: number
  maxFileSize?: number
  acceptedFileTypes?: Accept
}
