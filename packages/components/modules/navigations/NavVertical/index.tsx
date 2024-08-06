'use client'

import { FC } from 'react'

import { Logo, Scrollbar, useResponsive } from '@baseapp-frontend/design-system'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import { NAV } from '../constants'
import NavSectionVertical from '../shared/NavSectionVertical'
import NavToggleButton from '../shared/NavToggleButton'
import VerticalDrawer from '../shared/VerticalDrawer'
import { NavVerticalProps } from './types'

const NavVertical: FC<NavVerticalProps> = ({
  settings,
  setSettings,
  navData,
  LogoIcon,
  openNav,
  onCloseNav,
  hideToggleButton = false,
}) => {
  const lgDown = useResponsive('down', 'lg')

  if (lgDown) {
    return <VerticalDrawer navData={navData} openNav={openNav} onCloseNav={onCloseNav} />
  }

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_VERTICAL },
        display: { xs: 'none', lg: 'flex' },
      }}
    >
      {!hideToggleButton && <NavToggleButton settings={settings} setSettings={setSettings} />}
      <Stack
        sx={{
          height: 1,
          position: 'fixed',
          width: NAV.W_VERTICAL,
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
            <Logo sx={{ mt: 3, ml: 4, mb: 1 }}>
              <LogoIcon />
            </Logo>
          )}
          <NavSectionVertical navData={navData} />
          <Box sx={{ flexGrow: 1 }} />
        </Scrollbar>
      </Stack>
    </Box>
  )
}

export default NavVertical
