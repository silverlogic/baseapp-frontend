'use client'

import { FC } from 'react'

import { NavCenteredContainer, NavHorizontalContainer, NavVerticalContainer } from './styled'
import { MainContainerProps as MainContainerComponentProps } from './types'

const MainContainer: FC<MainContainerComponentProps> = ({
  children,
  isNavMini,
  isNavCentered,
  isNavHorizontal,
  MainContainerProps,
}) => {
  if (isNavCentered) {
    return (
      <NavCenteredContainer component="main" {...MainContainerProps}>
        {children}
      </NavCenteredContainer>
    )
  }

  if (isNavHorizontal) {
    return (
      <NavHorizontalContainer component="main" {...MainContainerProps}>
        {children}
      </NavHorizontalContainer>
    )
  }

  return (
    <NavVerticalContainer component="main" isNavMini={isNavMini} {...MainContainerProps}>
      {children}
    </NavVerticalContainer>
  )
}

export default MainContainer
