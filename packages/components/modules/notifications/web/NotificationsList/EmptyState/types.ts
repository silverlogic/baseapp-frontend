import { FC } from 'react'

import { BoxProps, SvgIconProps } from '@mui/material'

export type EmptyStateProps = {
  Container?: FC<BoxProps>
  NotificationBellIcon?: FC<SvgIconProps>
  NotificationBellIconProps?: Partial<SvgIconProps>
}
