import { FC, PropsWithChildren, ReactNode } from 'react'

import { PartialLogoProps } from '@baseapp-frontend/design-system/components/web/logos'
import { ThemeLayout } from '@baseapp-frontend/design-system/styles/web'

import { AppBarProps, ToolbarProps as MuiToolbarProps } from '@mui/material'
import { BoxProps } from '@mui/system'

import { AccountMenuProps } from './AccountMenu/types'

export interface CustomAppBarProps extends AppBarProps {
  themeLayout: ThemeLayout
}

export interface HeaderProps extends PropsWithChildren {
  onOpenNav?: VoidFunction
  LogoIcon?: React.FC
  LogoProps?: PartialLogoProps
  AccountMenu?: FC<AccountMenuProps>
  AccountMenuProps?: Partial<AccountMenuProps>
  HeaderCenterComponent?: ReactNode | null
  ToolbarProps?: MuiToolbarProps
  CustomAppBarProps?: Partial<CustomAppBarProps>
  HeaderCenterContainer?: FC<BoxProps>
}
