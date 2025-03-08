import { FC, PropsWithChildren } from 'react'

import { ThemeLayout, UISettings } from '@baseapp-frontend/design-system/styles/web'

import { AppBarProps, ToolbarProps as MuiToolbarProps, SxProps } from '@mui/material'

import { AccountMenuProps } from './AccountMenu/types'

export interface CustomAppBarProps extends AppBarProps {
  themeLayout: ThemeLayout
}

export interface HeaderProps extends PropsWithChildren {
  settings: UISettings
  onOpenNav?: VoidFunction
  LogoIcon?: React.FC
  LogoSx?: SxProps
  AccountMenu?: FC<AccountMenuProps>
  AccountMenuProps?: Partial<AccountMenuProps>
  ToolbarProps?: MuiToolbarProps
}
