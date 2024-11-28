'use client'

import { FC } from 'react'

import { Logo, hideScroll, useResponsive } from '@baseapp-frontend/design-system'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import { NAV_WIDTH } from '../constants'
import NavToggleButton from '../shared/NavToggleButton'
import VerticalDrawer from '../shared/VerticalDrawer'
import NavSectionMini from './NavSectionMini'
import { NavMiniProps } from './types'

const NavMini: FC<NavMiniProps> = ({
  navData,
  settings,
  setSettings,
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
        width: { lg: NAV_WIDTH.MINI },
        display: { xs: 'none', lg: 'flex' },
      }}
    >
      {!hideToggleButton && (
        <NavToggleButton
          settings={settings}
          setSettings={setSettings}
          sx={{
            top: 22,
            left: NAV_WIDTH.MINI - 12,
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
          <Logo sx={{ mx: 'auto', my: 2 }}>
            <LogoIcon />
          </Logo>
        )}
        <NavSectionMini navData={navData} />
      </Stack>
    </Box>
  )
}

export default NavMini
