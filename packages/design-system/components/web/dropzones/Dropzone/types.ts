import { HTMLAttributes, InputHTMLAttributes } from 'react'

import { Theme } from '@mui/material/styles'
import type { Accept, DropzoneOptions } from 'react-dropzone'

export interface InputContainerProps {
  theme?: Theme
  isDragAccept: boolean
  isDragReject: boolean
  isFocused: boolean
}

export interface DropzoneTextProps extends HTMLAttributes<HTMLSpanElement> {
  hasError?: boolean
}

export interface DropzoneProps {
  accept: Accept
  storedImg?: string
  onSelect: (imgString: string) => void
  onRemove: () => void
  actionText?: string
  subTitle?: string
  maxFileSize?: number
  DropzoneOptions?: Partial<DropzoneOptions>
  InputProps?: InputHTMLAttributes<HTMLInputElement>
}
