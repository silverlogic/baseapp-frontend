import { FC } from 'react'

import { SvgIconProps } from '../../icons'

export type AppBarProps = {
  title?: string
  titleComponent?: React.ReactNode
  onBack?: () => void
  onClose?: () => void
  BackIcon?: FC<SvgIconProps>
  CloseIcon?: FC<SvgIconProps>
  closeComponent?: React.ReactNode
}
