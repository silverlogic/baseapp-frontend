import type { ReactNode } from 'react'

import type { FilesList_target$key } from '../../../../__generated__/FilesList_target.graphql'

type Accept = Record<string, string[]>

export interface FileUploadTriggerProps {
  target: FilesList_target$key
  /** How the trigger is rendered: the full drop area (default) or a compact icon/label button. */
  as?: 'dropzone' | 'button'
  /** Button-variant only: icon shown inside the button (defaults to a paperclip). */
  icon?: ReactNode
  /** Button-variant only: accessible label / tooltip (defaults to "Attach files"). */
  label?: string
  maxFiles?: number
  maxFileSize?: number // in bytes
  acceptedFileTypes?: Accept
  disabled?: boolean
  autoAttach?: boolean
  onUploadComplete?: (fileIds: string[]) => void
  onAttachComplete?: () => void
  onError?: (error: Error) => void
}
