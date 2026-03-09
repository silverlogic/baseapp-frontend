import { FC } from 'react'

import { SvgIconProps } from '../../icons'

export type AppBarProps = {
  title?: string
  titleComponent?: React.ReactNode
  onBack?: () => void
  closeLabel?: string
  closeDisabled?: boolean
  onClose?: () => void
  BackIcon?: FC<SvgIconProps>
  CloseIcon?: FC<SvgIconProps>
  CloseIconProps?: SvgIconProps
  closeComponent?: React.ReactNode
}
