'use client'

import { FC } from 'react'

import { Logo } from '@baseapp-frontend/design-system/components/web/logos'
import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'

import Box from '@mui/material/Box'

import DefaultAccountMenu from '../Header/AccountMenu'
import DefaultNavAccountSection from '../__shared__/NavAccountSection'
import NavToggleButton from '../__shared__/NavToggleButton'
import VerticalDrawer from '../__shared__/VerticalDrawer'
import { NAV_WIDTH } from '../constants'
import NavSectionMini from './NavSectionMini'
import { NavContainer } from './styled'
import { NavMiniProps } from './types'

const NavMini: FC<NavMiniProps> = ({
  navData,
  LogoIcon,
  LogoProps,
  openNav,
  onCloseNav,
  hideToggleButton = false,
  slotProps,
  VerticalDrawerProps,
  NavToggleButtonProps,
  AccountMenu = DefaultAccountMenu,
  AccountMenuProps,
  NavAccountSection = DefaultNavAccountSection,
  NavAccountSectionProps,
  NotificationsPopover,
  NotificationsPopoverProps,
}) => {
  const lgDown = useResponsive('down', 'lg')

  if (lgDown) {
    return (
      <VerticalDrawer
        navData={navData}
        openNav={openNav}
        onCloseNav={onCloseNav}
        LogoIcon={LogoIcon}
        DrawerProps={VerticalDrawerProps}
      />
    )
  }

  return (
    <Box
      data-testid="nav-mini"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH.MINI },
        display: { xs: 'none', lg: 'flex' },
      }}
    >
      {!hideToggleButton && (
        <NavToggleButton
          {...NavToggleButtonProps}
          sx={{
            top: 22,
            left: NAV_WIDTH.MINI - 12,
            ...NavToggleButtonProps?.sx,
          }}
        />
      )}
      <NavContainer>
        {LogoIcon && (
          <Logo {...LogoProps} sx={{ mx: 'auto', my: 2, ...LogoProps?.sx }}>
            <LogoIcon />
          </Logo>
        )}
        <NavSectionMini navData={navData} slotProps={slotProps} />
        <Box sx={{ flexGrow: 1 }} />
        {NavAccountSection && (
          <NavAccountSection
            AccountMenu={AccountMenu}
            AccountMenuProps={AccountMenuProps}
            NotificationsPopover={NotificationsPopover}
            NotificationsPopoverProps={NotificationsPopoverProps}
            currentLayout="mini"
            {...NavAccountSectionProps}
          />
        )}
      </NavContainer>
    </Box>
  )
}

export default NavMini
