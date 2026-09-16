import { ReactNode } from 'react'

export interface ConfirmDialogProps {
  visible: boolean
  onClose: VoidFunction
  title: string
  content?: ReactNode
  cancelText?: string
  action: ReactNode
}
