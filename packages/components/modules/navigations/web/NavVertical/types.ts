import { FC } from 'react'

import { PartialLogoProps } from '@baseapp-frontend/design-system/components/web/logos'

import { DrawerProps, IconButtonProps } from '@mui/material'

import { NotificationsPopoverProps } from '../../../notifications/web/NotificationsPopover/types'
import { AccountMenuProps } from '../Header/AccountMenu/types'
import { NavigationData, SlotProps } from '../types'

export interface NavVerticalProps {
  navData: NavigationData
  LogoIcon?: FC
  LogoProps?: PartialLogoProps
  openNav: boolean
  onCloseNav: VoidFunction
  hideToggleButton?: boolean
  slotProps?: SlotProps
  VerticalDrawerProps?: Partial<DrawerProps>
  NavToggleButtonProps?: Partial<IconButtonProps>
  AccountMenu?: FC<AccountMenuProps>
  AccountMenuProps?: Partial<AccountMenuProps>
  NotificationsPopover?: FC<NotificationsPopoverProps>
  NotificationsPopoverProps?: Partial<NotificationsPopoverProps>
}
