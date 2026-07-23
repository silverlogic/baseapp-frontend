import type { FileItem_file$key } from '../../../../__generated__/FileItem_file.graphql'

export interface AttachedFileItemProps {
  file: FileItem_file$key
  targetObjectId?: string
  variant?: 'card' | 'chip'
  /** When true (edit mode), show a remove control on attached files the user can change. */
  editable?: boolean
}
