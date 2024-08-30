import { TypographyProps } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { Accept } from 'react-dropzone'

import { LogoOverrides } from '../../hooks/useLogoOverrides/types'

export interface InputContainerProps {
  theme?: Theme
  isDragAccept: boolean
  isDragReject: boolean
  isFocused: boolean
}

export interface DropzoneTextProps extends TypographyProps {
  hasError?: boolean
}

export interface DropzoneProps {
  accept: Accept
  size: keyof LogoOverrides
  storedImg?: string
  onSelect: (imgString: string, size: keyof LogoOverrides) => void
  onRemove: (size: keyof LogoOverrides) => void
}
