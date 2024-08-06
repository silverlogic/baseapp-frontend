import { FC, PropsWithChildren } from 'react'

import { ThemeLayout, UISettings } from '@baseapp-frontend/design-system'

import { AppBarProps, ToolbarProps as MuiToolbarProps } from '@mui/material'

import { AccountMenuProps } from './AccountMenu/types'

export interface CustomAppBarProps extends AppBarProps {
  themeLayout: ThemeLayout
}

export interface HeaderProps extends PropsWithChildren {
  settings: UISettings
  onOpenNav?: VoidFunction
  LogoIcon?: React.FC
  AccountMenu?: FC<AccountMenuProps>
  AccountMenuProps?: Partial<AccountMenuProps>
  ToolbarProps?: MuiToolbarProps
  additionalComponent?: React.ReactNode
}
