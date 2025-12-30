import { FC, PropsWithChildren } from 'react'

import { PartialLogoProps } from '@baseapp-frontend/design-system/components/web/logos'

import { ToolbarProps as MuiToolbarProps } from '@mui/material'

import { AccountMenuProps } from '../Header/AccountMenu/types'
import { NavigationData } from '../types'
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
  enableHeader?: boolean
}
