export interface UploadingFilesListProps {
  /** Upload-store scope to show (e.g. a composer's deferred-attachments scope). */
  scope?: string
  allowRemove?: boolean
  allowRetry?: boolean
  shouldUseBottomSheetSafeComponents?: boolean
}
