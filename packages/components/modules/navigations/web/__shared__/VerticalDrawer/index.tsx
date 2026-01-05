'use client'

import { FC, useEffect } from 'react'

import { Logo } from '@baseapp-frontend/design-system/components/web/logos'
import { Scrollbar } from '@baseapp-frontend/design-system/components/web/scrollbars'

import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { useTheme } from '@mui/material/styles'
import { usePathname } from 'next/navigation'

import { NAV_WIDTH } from '../../constants'
import NavSectionVertical from '../NavSectionVertical'
import { VerticalDrawerProps } from './types'

const VerticalDrawer: FC<VerticalDrawerProps> = ({
  navData,
  LogoIcon,
  LogoProps,
  openNav,
  onCloseNav,
}) => {
  const pathname = usePathname()
  const theme = useTheme()
  useEffect(() => {
    if (openNav) {
      onCloseNav()
    }
  }, [pathname])

  return (
    <Drawer
      open={openNav}
      onClose={onCloseNav}
      PaperProps={{
        sx: {
          width: NAV_WIDTH.VERTICAL,
          height: '100% !important',
          backgroundColor: `${theme.palette.grey[900]} !important`,
        },
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
      </Scrollbar>
    </Drawer>
  )
}

export default VerticalDrawer
