import type { FilesList_target$key } from '../../../../__generated__/FilesList_target.graphql'

type Accept = Record<string, string[]>

export interface FileUploadProps {
  target: FilesList_target$key
  maxFiles?: number
  maxFileSize?: number // in bytes
  acceptedFileTypes?: Accept
  disabled?: boolean
  autoAttach?: boolean
  onUploadComplete?: (fileIds: string[]) => void
  onAttachComplete?: () => void
  onError?: (error: Error) => void
}
