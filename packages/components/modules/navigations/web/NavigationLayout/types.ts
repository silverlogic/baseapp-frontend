import { FC, PropsWithChildren } from 'react'

import { PartialLogoProps } from '@baseapp-frontend/design-system/components/web/logos'

import { DrawerProps, IconButtonProps, ToolbarProps as MuiToolbarProps } from '@mui/material'

import { AccountMenuProps } from '../Header/AccountMenu/types'
import { NavigationData, SlotProps } from '../types'
import { MainContainerProps } from './MainContainer/types'

export interface NavigationLayoutProps extends PropsWithChildren {
  navData: NavigationData
  LogoIcon?: React.FC
  LogoProps?: PartialLogoProps
  AccountMenu?: FC<AccountMenuProps>
  AccountMenuProps?: Partial<AccountMenuProps>
  ToolbarProps?: MuiToolbarProps
  MainContainerProps?: Partial<MainContainerProps>
  MainContainer?: FC<MainContainerProps>
  slotProps?: SlotProps
  VerticalDrawerProps?: Partial<DrawerProps>
  NavToggleButtonProps?: Partial<IconButtonProps>
  enableHeader?: boolean
}
