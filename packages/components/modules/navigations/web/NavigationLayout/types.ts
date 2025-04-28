import { FC, PropsWithChildren } from 'react'

import { PartialLogoProps } from '@baseapp-frontend/design-system/components/web/logos'
import { UISettings } from '@baseapp-frontend/design-system/styles/web'

import { ToolbarProps as MuiToolbarProps } from '@mui/material'

import { AccountMenuProps } from '../Header/AccountMenu/types'
import { NavigationData } from '../types'
import { MainContainerProps } from './MainContainer/types'

export interface NavigationLayoutProps extends PropsWithChildren {
  navData: NavigationData
  settings: UISettings
  setSettings: (newSettings: Partial<UISettings>) => void
  LogoIcon?: React.FC
  LogoProps?: PartialLogoProps
  AccountMenu?: FC<AccountMenuProps>
  AccountMenuProps?: Partial<AccountMenuProps>
  ToolbarProps?: MuiToolbarProps
  MainContainerProps?: Partial<MainContainerProps>
  MainContainer?: FC<Partial<MainContainerProps>>
}
