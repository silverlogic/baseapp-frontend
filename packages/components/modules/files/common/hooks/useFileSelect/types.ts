import type { ChangeEventHandler } from 'react'

import type { Accept } from '../../types'

export type { Accept }

export interface UseFileSelectParams {
  onFilesSelected: (files: File[]) => void
  maxFiles?: number
  maxFileSize?: number // in bytes
  acceptedFileTypes?: Accept
  disabled?: boolean
}

export interface FileSelectInputProps {
  ref: (node: HTMLInputElement | null) => void
  type: 'file'
  multiple: boolean
  accept?: string
  disabled?: boolean
  style: { display: 'none' }
  onChange: ChangeEventHandler<HTMLInputElement>
}

export interface UseFileSelectReturn {
  /** Programmatically open the OS file picker. */
  open: () => void
  /** Spread onto a hidden <input> the trigger renders. */
  getInputProps: () => FileSelectInputProps
}
