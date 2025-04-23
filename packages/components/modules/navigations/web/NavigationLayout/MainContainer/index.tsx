'use client'

import { FC } from 'react'

import { NavCenteredContainer, NavHorizontalContainer, NavVerticalContainer } from './styled'
import { MainContainerProps } from './types'

const MainContainer: FC<MainContainerProps> = ({
  children,
  isNavMini,
  isNavCentered,
  isNavHorizontal,
  BodyProps,
}) => {
  if (isNavCentered) {
    return (
      <NavCenteredContainer component="main" {...BodyProps}>
        {children}
      </NavCenteredContainer>
    )
  }

  if (isNavHorizontal) {
    return (
      <NavHorizontalContainer component="main" {...BodyProps}>
        {children}
      </NavHorizontalContainer>
    )
  }

  return (
    <NavVerticalContainer component="main" isNavMini={isNavMini} {...BodyProps}>
      {children}
    </NavVerticalContainer>
  )
}

export default MainContainer
