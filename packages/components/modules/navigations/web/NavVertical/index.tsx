'use client'

import { FC } from 'react'

import { Logo } from '@baseapp-frontend/design-system/components/web/logos'
import { Scrollbar } from '@baseapp-frontend/design-system/components/web/scrollbars'
import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import DefaultAccountMenu from '../Header/AccountMenu'
import NavSectionVertical from '../__shared__/NavSectionVertical'
import NavToggleButton from '../__shared__/NavToggleButton'
import VerticalDrawer from '../__shared__/VerticalDrawer'
import { NAV_WIDTH } from '../constants'
import { NavVerticalProps } from './types'

const NavVertical: FC<NavVerticalProps> = ({
  navData,
  LogoIcon,
  LogoProps,
  openNav,
  onCloseNav,
  hideToggleButton = false,
  AccountMenu = DefaultAccountMenu,
  AccountMenuProps,
}) => {
  const lgDown = useResponsive('down', 'lg')

  if (lgDown) {
    return (
      <VerticalDrawer
        navData={navData}
        openNav={openNav}
        onCloseNav={onCloseNav}
        LogoIcon={LogoIcon}
        LogoProps={LogoProps}
      />
    )
  }

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH.VERTICAL },
        display: { xs: 'none', lg: 'flex' },
        backgroundColor: 'grey.900',
      }}
    >
      {!hideToggleButton && <NavToggleButton />}
      <Stack
        sx={{
          height: 1,
          position: 'fixed',
          width: NAV_WIDTH.VERTICAL,
          borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <Scrollbar
          sx={{
            height: 1,
            '& .simplebar-content': {
              height: 1,
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          {LogoIcon && (
            <Logo {...LogoProps} sx={{ mt: 3, ml: 4, mb: 1, ...LogoProps?.sx }}>
              <LogoIcon />
            </Logo>
          )}
          <NavSectionVertical navData={navData} />
          <Box sx={{ flexGrow: 1 }} />
          {AccountMenu && AccountMenuProps && (
            <Box
              sx={{
                px: 0,
                pb: 0,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <AccountMenu {...AccountMenuProps} vertical />
            </Box>
          )}
        </Scrollbar>
      </Stack>
    </Box>
  )
}

export default NavVertical
