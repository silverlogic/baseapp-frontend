import { FC, PropsWithChildren } from 'react'

import { PartialLogoProps } from '@baseapp-frontend/design-system/components/web/logos'
import { ThemeLayout, UISettings } from '@baseapp-frontend/design-system/styles/web'

import { AppBarProps, ToolbarProps as MuiToolbarProps } from '@mui/material'

import { AccountMenuProps } from './AccountMenu/types'

export interface CustomAppBarProps extends AppBarProps {
  themeLayout: ThemeLayout
}

export interface HeaderProps extends PropsWithChildren {
  settings: UISettings
  onOpenNav?: VoidFunction
  LogoIcon?: React.FC
  LogoProps?: PartialLogoProps
  AccountMenu?: FC<AccountMenuProps>
  AccountMenuProps?: Partial<AccountMenuProps>
  ToolbarProps?: MuiToolbarProps
}
