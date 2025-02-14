import { FC } from 'react'

import { SvgIconProps } from '@mui/material'

export interface SubmitActionsProps {
  formId: string
  disabled?: boolean
  ariaLabel?: string
  cancelAriaLabel?: string
  SendMessageIcon?: FC<SvgIconProps>
  SendMessageIconProps?: SvgIconProps
  handleEditCancel?: () => void
}
