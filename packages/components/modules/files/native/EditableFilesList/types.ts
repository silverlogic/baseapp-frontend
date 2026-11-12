import type { FilesList_target$key } from '../../../../__generated__/FilesList_target.graphql'

export interface EditableFilesListProps {
  /** Target whose attached files are listed (e.g. the comment being edited). */
  target?: FilesList_target$key | null
  /** Upload-store scope of the uploads being attached to the target. */
  scope?: string
  onRemoveFile: (fileId: string) => void
  shouldUseBottomSheetSafeComponents?: boolean
}
