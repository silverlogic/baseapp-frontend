'use client'

import { FC } from 'react'

import { MenuIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { Logo } from '@baseapp-frontend/design-system/components/web/logos'
import { useUISettings } from '@baseapp-frontend/design-system/hooks/web'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'

import DefaultAccountMenu from './AccountMenu'
import { CustomAppBar, HeaderCenterContainer as DefaultHeaderCenterContainer } from './styled'
import { HeaderProps } from './types'

const Header: FC<HeaderProps> = ({
  children,
  onOpenNav,
  LogoIcon,
  LogoProps,
  AccountMenu = DefaultAccountMenu,
  AccountMenuProps,
  HeaderCenterComponent,
  ToolbarProps,
  CustomAppBarProps = {},
  HeaderCenterContainer = DefaultHeaderCenterContainer,
}) => {
  const { settings } = useUISettings()
  const isNavHorizontal = settings.themeLayout === 'horizontal'
  const isNavCentered = settings.themeLayout === 'centered'

  const renderAccountMenu = () => {
    // If the layout is centered, we render the AccountMenu in the header. We might want to figure out a better way to handle this in the future once we define designs for this extra component.
    if (HeaderCenterComponent && !isNavCentered) {
      return (
        <>
          <HeaderCenterContainer>{HeaderCenterComponent}</HeaderCenterContainer>
          <Box sx={{ flexShrink: 0 }}>
            <AccountMenu {...AccountMenuProps}>{children}</AccountMenu>
          </Box>
        </>
      )
    }

    return <AccountMenu {...AccountMenuProps}>{children}</AccountMenu>
  }

  return (
    <CustomAppBar {...CustomAppBarProps} themeLayout={settings.themeLayout}>
      <Toolbar
        {...ToolbarProps}
        sx={[
          {
            height: 1,
            px: { lg: 5 },
            justifyContent: 'center',
            gap: 2,
          },
          ...(Array.isArray(ToolbarProps?.sx) ? ToolbarProps.sx : [ToolbarProps?.sx]),
        ]}
      >
        {LogoIcon && (isNavHorizontal || isNavCentered) && (
          <Logo
            {...LogoProps}
            sx={{
              display: { xs: 'none', lg: 'flex' },
              ...LogoProps?.sx,
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
        {renderAccountMenu()}
      </Toolbar>
    </CustomAppBar>
  )
}

export default Header
