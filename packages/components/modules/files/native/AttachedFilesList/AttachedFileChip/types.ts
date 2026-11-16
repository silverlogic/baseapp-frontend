import type { FileItem_file$key } from '../../../../../__generated__/FileItem_file.graphql'

export interface AttachedFileChipProps {
  file: FileItem_file$key
  /** Shows a remove button (for files the viewer may change); receives the file id. */
  onRemove?: (fileId: string) => void
  shouldUseBottomSheetSafeComponents?: boolean
}
