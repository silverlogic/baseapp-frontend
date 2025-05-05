import { ComponentType } from 'react'

import { TypographyProps } from '@mui/material'

export interface HeaderProps {
  isDisabled: boolean
  onCreateButtonClicked: () => void
  onBackButtonClicked: () => void
  title?: string
  titleProps?: TypographyProps
  CloseIcon?: ComponentType
  CreateIcon?: ComponentType
}
