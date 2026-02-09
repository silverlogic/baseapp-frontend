import { FC } from 'react'

import { NonUndefined, useBoolean } from '@baseapp-frontend/utils'

import DefaultHeaderNavigation from '../../__shared__/HeaderNavigation'
import DefaultSidebarNavigation from '../../__shared__/SidebarNavigation'
import type { VerticalLayoutProps, VerticalLayoutSlots } from './types'

const VerticalLayout: FC<VerticalLayoutProps> = ({ children, slots, slotProps, navData }) => {
  const { value: isDrawerOpen, onToggle: onDrawerToggle } = useBoolean()

  const {
    SidebarNavigation = DefaultSidebarNavigation,
    HeaderNavigation = DefaultHeaderNavigation,
  } = slots || ({} as NonUndefined<VerticalLayoutSlots>)

  return (
    <>
      <HeaderNavigation {...slotProps?.HeaderNavigation} />
      <SidebarNavigation
        isDrawerOpen={isDrawerOpen}
        onDrawerToggle={onDrawerToggle}
        navData={navData}
        {...slotProps?.SidebarNavigation}
      >
        {children}
      </SidebarNavigation>
    </>
  )
}

export default VerticalLayout
