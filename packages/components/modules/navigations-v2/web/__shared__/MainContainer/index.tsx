'use client'

import { FC } from 'react'

import { NavCenteredContainer, NavHorizontalContainer, NavVerticalContainer } from './styled'
import { MainContainerProps } from './types'

const MainContainer: FC<MainContainerProps> = ({
  children,
  isNavMini,
  isNavCentered,
  isNavHorizontal,
  BoxProps,
}) => {
  if (isNavCentered) {
    return (
      <NavCenteredContainer component="main" {...BoxProps}>
        {children}
      </NavCenteredContainer>
    )
  }

  if (isNavHorizontal) {
    return (
      <NavHorizontalContainer component="main" {...BoxProps}>
        {children}
      </NavHorizontalContainer>
    )
  }

  return (
    <NavVerticalContainer component="main" isNavMini={isNavMini} {...BoxProps}>
      {children}
    </NavVerticalContainer>
  )
}

export default MainContainer
