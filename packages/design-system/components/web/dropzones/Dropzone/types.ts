import { CSSProperties, HTMLAttributes, InputHTMLAttributes } from 'react'

import { Theme } from '@mui/material/styles'
import type { Accept, DropzoneOptions } from 'react-dropzone'

export interface InputContainerProps extends HTMLAttributes<HTMLDivElement> {
  theme?: Theme
  isDragAccept: boolean
  isDragReject: boolean
  isFocused: boolean
}

export interface DropzoneTextProps extends HTMLAttributes<HTMLSpanElement> {
  hasError?: boolean
}

export interface BaseDropzoneProps {
  accept: Accept
  onRemove: (index?: number) => void
  actionText?: string
  subTitle?: string
  maxFileSize?: number
  DropzoneOptions?: Partial<DropzoneOptions>
  InputProps?: InputHTMLAttributes<HTMLInputElement>
  title?: string | JSX.Element
  includeActionButton: boolean
  InputContainerStyle?: CSSProperties
  multiple?: boolean
  onFileClick?: (selectedFile: string | File | Blob, index?: number) => void
}

export interface DropzoneAsSingleBase64Props extends BaseDropzoneProps {
  multiple?: false
  asBase64: true
  storedImg?: string
  onSelect: (file: string) => void
}

export interface DropzoneAsSingleFileProps extends BaseDropzoneProps {
  multiple?: false
  asBase64?: false
  storedImg?: File | Blob
  onSelect: (file: File | Blob) => void
}

export interface DropzoneAsMultipleBase64Props extends BaseDropzoneProps {
  multiple: true
  asBase64: true
  storedImg?: string[]
  onSelect: (files: string[]) => void
}

export interface DropzoneAsMultipleFileProps extends BaseDropzoneProps {
  multiple: true
  asBase64?: false
  storedImg?: (File | Blob)[]
  onSelect: (files: (File | Blob)[]) => void
}

export interface DropzonePreviewProps {
  isMini?: boolean
  handleRemoveFile: () => void
  file: string | File | Blob
  onFileClick?: (selectedFile: string | File | Blob) => void
}

export type DropzoneProps =
  | DropzoneAsSingleBase64Props
  | DropzoneAsSingleFileProps
  | DropzoneAsMultipleBase64Props
  | DropzoneAsMultipleFileProps
