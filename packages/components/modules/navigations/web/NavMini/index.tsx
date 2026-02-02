'use client'

import { FC } from 'react'

import { Logo } from '@baseapp-frontend/design-system/components/web/logos'
import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'
import { hideScroll } from '@baseapp-frontend/design-system/styles/web'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import DefaultAccountMenu from '../Header/AccountMenu'
import NavToggleButton from '../__shared__/NavToggleButton'
import VerticalDrawer from '../__shared__/VerticalDrawer'
import { NAV_WIDTH } from '../constants'
import NavSectionMini from './NavSectionMini'
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
      <Stack
        sx={{
          pb: 2,
          height: 1,
          position: 'fixed',
          width: NAV_WIDTH.MINI,
          borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
          ...hideScroll.x,
        }}
      >
        {LogoIcon && (
          <Logo {...LogoProps} sx={{ mx: 'auto', my: 2, ...LogoProps?.sx }}>
            <LogoIcon />
          </Logo>
        )}
        <NavSectionMini navData={navData} slotProps={slotProps} />
        <Box sx={{ flexGrow: 1 }} />
        {(!!AccountMenu || !!NotificationsPopover) && (
          <Box
            sx={{
              mt: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {AccountMenu && (
              <AccountMenu
                {...AccountMenuProps}
                vertical
                additionalComponent={
                  NotificationsPopover ? (
                    <NotificationsPopover {...NotificationsPopoverProps} currentLayout="mini" />
                  ) : (
                    AccountMenuProps?.additionalComponent
                  )
                }
              />
            )}
          </Box>
        )}
      </Stack>
    </Box>
  )
}

export default NavMini
