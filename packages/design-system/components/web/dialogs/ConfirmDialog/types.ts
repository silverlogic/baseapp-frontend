import { ReactNode } from 'react'

import { DialogProps } from '../Dialog/types'

export interface ConfirmDialogProps extends Omit<DialogProps, 'title' | 'content'> {
  title: ReactNode
  content?: ReactNode
  cancelText?: string
  action: ReactNode
  onClose: VoidFunction
}
