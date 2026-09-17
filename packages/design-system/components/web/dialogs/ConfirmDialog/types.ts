import { ReactNode } from 'react'

import { DialogActionsProps, DialogContentProps, DialogTitleProps } from '@mui/material'

import { DialogProps } from '../Dialog/types'

export interface ConfirmDialogProps extends Omit<DialogProps, 'title' | 'content'> {
  title: ReactNode
  content?: ReactNode
  cancelText?: string
  action: ReactNode
  onClose: VoidFunction
  hideCancelButton?: boolean
  DialogTitleProps?: Partial<DialogTitleProps>
  DialogContentProps?: Partial<DialogContentProps>
  DialogActionsProps?: Partial<DialogActionsProps>
}
