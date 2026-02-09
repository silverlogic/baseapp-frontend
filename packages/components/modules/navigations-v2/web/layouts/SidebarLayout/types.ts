import { ComponentProps, PropsWithChildren } from 'react'

import type SidebarNavigation from '../../__shared__/SidebarNavigation'
import { NavigationData } from '../../types'

export type SidebarLayoutSlots = {
  SidebarNavigation?: typeof SidebarNavigation
}

export type SidebarLayoutSlotProps = {
  SidebarNavigation?: Partial<ComponentProps<typeof SidebarNavigation>>
}

export interface SidebarLayoutProps extends PropsWithChildren {
  slots?: SidebarLayoutSlots
  slotProps?: SidebarLayoutSlotProps
  navData: NavigationData
}
