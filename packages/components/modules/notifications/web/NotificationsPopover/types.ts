import { FC } from 'react'

import { BadgeProps, DrawerProps, SvgIconProps } from '@mui/material'

import { NotificationsListProps } from '../NotificationsList/types'

export interface NotificationsPopoverProps {
  Drawer?: FC<DrawerProps>
  DrawerProps?: Partial<DrawerProps>
  Badge?: FC<BadgeProps>
  BadgeProps?: Partial<BadgeProps>
  NotificationBellIcon?: FC<SvgIconProps>
  NotificationBellIconProps?: Partial<SvgIconProps>
  NotificationsList?: FC<NotificationsListProps>
  NotificationsListProps?: Partial<NotificationsListProps>
  showLabel?: boolean
  labelComponent?: React.ReactNode
  currentLayout?: 'vertical' | 'mini' | 'horizontal' | 'centered'
}
