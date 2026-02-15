import { FC } from 'react'

import { NonUndefined, useBoolean } from '@baseapp-frontend/utils'

import DefaultSidebarNavigation from '../../__shared__/SidebarNavigation'
import type { SidebarLayoutProps, SidebarLayoutSlots } from './types'

const SidebarLayout: FC<SidebarLayoutProps> = ({ children, slots, slotProps, navData }) => {
  const { value: isDrawerOpen, onToggle: onDrawerToggle } = useBoolean()

  const { SidebarNavigation = DefaultSidebarNavigation } =
    slots || ({} as NonUndefined<SidebarLayoutSlots>)

  return (
    <SidebarNavigation
      isDrawerOpen={isDrawerOpen}
      onDrawerToggle={onDrawerToggle}
      navData={navData}
      {...slotProps?.SidebarNavigation}
    >
      {children}
    </SidebarNavigation>
  )
}

export default SidebarLayout
