'use client'

import { FC, memo } from 'react'

import { Scrollbar, bgBlur, useResponsive } from '@baseapp-frontend/design-system'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { useTheme } from '@mui/material/styles'

import { HEADER } from '../constants'
import NavSectionHorizontal from '../shared/NavSectionHorizontal'
import VerticalDrawer from '../shared/VerticalDrawer'
import HeaderShadow from './HeaderShadow'
import { NavHorizontalProps } from './types'

const NavHorizontal: FC<NavHorizontalProps> = ({ navData, openNav, onCloseNav }) => {
  const theme = useTheme()
  const lgDown = useResponsive('down', 'lg')

  if (lgDown) {
    return <VerticalDrawer navData={navData} openNav={openNav} onCloseNav={onCloseNav} />
  }

  return (
    <AppBar
      component="div"
      sx={{
        top: HEADER.H_DESKTOP_OFFSET,
        display: { xs: 'none', lg: 'flex' },
      }}
    >
      <Toolbar
        sx={{
          ...bgBlur({
            color: theme.palette.background.default,
          }),
          justifyContent: 'center',
        }}
      >
        <Scrollbar
          sx={{
            '& .simplebar-content': {
              display: 'flex',
            },
          }}
        >
          <NavSectionHorizontal navData={navData} />
        </Scrollbar>
      </Toolbar>
      <HeaderShadow />
    </AppBar>
  )
}

export default memo(NavHorizontal)
