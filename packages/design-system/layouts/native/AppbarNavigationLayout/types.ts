import React, { FC } from 'react'

import { SvgIconProps } from '../../../components/native/icons'

export interface AppbarNavigationLayoutProps {
  title: string
  onBack?: () => void
  onClose?: () => void
  closeLabel?: string
  closeDisabled?: boolean
  closeComponent?: React.ReactNode
  CloseIcon?: FC<SvgIconProps>
  CloseIconProps?: SvgIconProps
}
