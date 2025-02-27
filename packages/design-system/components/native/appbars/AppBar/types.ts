import { FC } from 'react'

import { SvgIconProps } from '../../icons'

export type AppBarProps = {
  title: string
  onBack?: () => void
  onClose?: () => void
  BackIcon?: FC<SvgIconProps>
  CloseIcon?: FC<SvgIconProps>
}
