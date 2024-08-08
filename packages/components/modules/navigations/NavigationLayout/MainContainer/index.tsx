'use client'

import React, { FC } from 'react'

import { NavCenteredContainer, NavHorizontalContainer, NavVerticalContainer } from './styled'
import { MainContainerProps } from './types'

const MainContainer: FC<MainContainerProps> = ({
  children,
  isNavMini,
  isNavCentered,
  isNavHorizontal,
}) => {
  if (isNavCentered) {
    return <NavCenteredContainer component="main">{children}</NavCenteredContainer>
  }

  if (isNavHorizontal) {
    return <NavHorizontalContainer component="main">{children}</NavHorizontalContainer>
  }

  return (
    <NavVerticalContainer component="main" isNavMini={isNavMini}>
      {children}
    </NavVerticalContainer>
  )
}

export default MainContainer
