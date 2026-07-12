import type { FileUploadTriggerProps } from '@baseapp-frontend/components/files/web'

export interface CommentFilesUpsertActionsProps {
  /** The comment (a FilesInterface implementer) files attach to. */
  target: FileUploadTriggerProps['target']
}
