import React, { FC, memo } from 'react'

import NavList from './NavList'
import { Container, ItemsContainer } from './styled'
import { NavSectionHorizontalProps } from './types'

const NavSectionHorizontal: FC<NavSectionHorizontalProps> = ({
  navData,
  slotProps,
  hasTabLayout,
}) => (
  <Container>
    <ItemsContainer>
      {navData.map((group) =>
        group.items.map((list) => (
          <NavList
            key={list.title}
            data={list}
            depth={1}
            slotProps={slotProps}
            hasTabLayout={hasTabLayout}
          />
        )),
      )}
    </ItemsContainer>
  </Container>
)

export default memo(NavSectionHorizontal)
