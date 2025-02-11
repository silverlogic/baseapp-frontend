'use client'

import React, { FC, memo } from 'react'

import { Scrollbar } from '@baseapp-frontend/design-system/components/web/scrollbars'
import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'

import NavSectionHorizontal from '../__shared__/NavSectionHorizontal'
import VerticalDrawer from '../__shared__/VerticalDrawer'
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
