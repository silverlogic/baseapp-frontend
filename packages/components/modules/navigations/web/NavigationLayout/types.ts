import { FC, PropsWithChildren } from 'react'

import { UISettings } from '@baseapp-frontend/design-system/styles/web'

import { ToolbarProps as MuiToolbarProps, SxProps } from '@mui/material'

import { AccountMenuProps } from '../Header/AccountMenu/types'
import { NavigationData } from '../types'

export interface NavigationLayoutProps extends PropsWithChildren {
  navData: NavigationData
  settings: UISettings
  setSettings: (newSettings: Partial<UISettings>) => void
  LogoIcon?: React.FC
  LogoSx?: SxProps
  AccountMenu?: FC<AccountMenuProps>
  AccountMenuProps?: Partial<AccountMenuProps>
  ToolbarProps?: MuiToolbarProps
}
