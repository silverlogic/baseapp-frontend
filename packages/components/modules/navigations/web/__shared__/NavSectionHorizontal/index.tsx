import React, { FC, memo } from 'react'

import NavList from './NavList'
import { NavSectionHorizontalProps } from './types'

const NavSectionHorizontal: FC<NavSectionHorizontalProps> = ({
  navData,
  slotProps,
  hasTabLayout,
}) => (
  <div className="flex min-h-16 w-full items-center justify-around lg:hidden">
    <div className="flex h-full gap-[6px]">
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
    </div>
  </div>
)

export default memo(NavSectionHorizontal)
