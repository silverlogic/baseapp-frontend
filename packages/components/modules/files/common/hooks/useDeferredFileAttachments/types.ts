export interface UseDeferredFileAttachmentsReturn {
  /** Upload the selected files immediately; their ids are held for a later attachTo. */
  handleFilesSelected: (files: File[]) => Promise<void>
  /**
   * Attach every successfully uploaded file to a target that now exists (e.g. a
   * freshly created comment). Waits for any in-flight uploads first, so a fast
   * submit still attaches them. onDone runs after the attach settles.
   */
  attachTo: (targetObjectId: string, onDone?: () => void) => Promise<void>
  /** Discard the held uploads without attaching them. */
  reset: () => void
  isUploading: boolean
  isAttaching: boolean
  /**
   * True while any file in this composer's scope is not COMPLETED — in flight,
   * paused or failed. Gate submit on it so a half-finished upload cannot be
   * silently dropped from the comment.
   */
  hasPendingFiles: boolean
  /** Upload scope for this composer — pass to UploadingFilesList to show its progress. */
  scope: string
}
