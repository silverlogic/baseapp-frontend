'use client'

import React, { FC, memo } from 'react'

import { Scrollbar, useResponsive } from '@baseapp-frontend/design-system'

import NavSectionHorizontal from '../shared/NavSectionHorizontal'
import VerticalDrawer from '../shared/VerticalDrawer'
import { NavCenteredProps } from './types'

const NavCentered: FC<NavCenteredProps> = ({ navData, openNav, onCloseNav }) => {
  const lgDown = useResponsive('down', 'lg')

  if (lgDown) {
    return (
      <>
        <VerticalDrawer navData={navData} openNav={openNav} onCloseNav={onCloseNav} />
        <div />
      </>
    )
  }

  return (
    <Scrollbar
      sx={{
        '& .simplebar-content': {
          display: 'flex',
        },
      }}
    >
      <NavSectionHorizontal navData={navData} hasTabLayout />
    </Scrollbar>
  )
}

export default memo(NavCentered)
