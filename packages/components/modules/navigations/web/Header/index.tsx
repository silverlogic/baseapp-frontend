'use client'

import { FC } from 'react'

import { MenuIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { Logo } from '@baseapp-frontend/design-system/components/web/logos'

import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'

import DefaultAccountMenu from './AccountMenu'
import { CustomAppBar } from './styled'
import { HeaderProps } from './types'

const Header: FC<HeaderProps> = ({
  settings,
  children,
  onOpenNav,
  LogoIcon,
  AccountMenu = DefaultAccountMenu,
  AccountMenuProps,
  ToolbarProps,
}) => {
  const isNavHorizontal = settings.themeLayout === 'horizontal'
  const isNavCentered = settings.themeLayout === 'centered'

  return (
    <CustomAppBar themeLayout={settings.themeLayout}>
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
          justifyContent: 'center',
          gap: 2,
        }}
        {...ToolbarProps}
      >
        {LogoIcon && (isNavHorizontal || isNavCentered) && (
          <Logo
            sx={{
              display: { xs: 'none', lg: 'flex' },
            }}
          >
            <LogoIcon />
          </Logo>
        )}
        <IconButton
          onClick={onOpenNav}
          sx={{
            display: { xs: 'flex', lg: 'none' },
          }}
        >
          <MenuIcon />
        </IconButton>
        <AccountMenu {...AccountMenuProps}>{children}</AccountMenu>
      </Toolbar>
    </CustomAppBar>
  )
}

export default Header
