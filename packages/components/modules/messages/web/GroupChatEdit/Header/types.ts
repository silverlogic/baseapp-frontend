import { ComponentType } from 'react'

import { TypographyProps } from '@mui/material'

export interface HeaderProps {
  CloseIcon?: ComponentType
  EditIcon?: ComponentType
  isEditButtonDisabled: boolean
  isMutationInFlight: boolean
  onCancellation: () => void
  onSubmit: () => void
  title?: string
  titleProps?: TypographyProps
}
