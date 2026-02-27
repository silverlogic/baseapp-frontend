import { FC } from 'react'

import { PartialLogoProps } from '@baseapp-frontend/design-system/components/web/logos'

import { DrawerProps } from '@mui/material'

import { NotificationsPopoverProps } from '../../../notifications/web/NotificationsPopover/types'
import { AccountMenuProps } from '../Header/AccountMenu/types'
import { NavAccountSectionProps } from '../__shared__/NavAccountSection/types'
import { NavToggleButtonProps } from '../__shared__/NavToggleButton/types'
import { NavigationData, SlotProps } from '../types'

export interface NavMiniProps {
  navData: NavigationData
  openNav: boolean
  onCloseNav: VoidFunction
  LogoIcon?: FC
  LogoProps?: PartialLogoProps
  hideToggleButton?: boolean
  slotProps?: SlotProps
  VerticalDrawerProps?: Partial<DrawerProps>
  NavToggleButtonProps?: Partial<NavToggleButtonProps>
  AccountMenu?: FC<AccountMenuProps>
  AccountMenuProps?: Partial<AccountMenuProps>
  NavAccountSection?: FC<NavAccountSectionProps> | null
  NavAccountSectionProps?: Partial<NavAccountSectionProps>
  NotificationsPopover?: FC<NotificationsPopoverProps>
  NotificationsPopoverProps?: Partial<NotificationsPopoverProps>
}
