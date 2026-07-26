import { ComponentProps, PropsWithChildren } from 'react'

import type HeaderNavigation from '../../__shared__/HeaderNavigation'
import type SidebarNavigation from '../../__shared__/SidebarNavigation'
import type { NavigationData } from '../../types'

export type VerticalLayoutSlots = {
  SidebarNavigation?: typeof SidebarNavigation
  HeaderNavigation?: typeof HeaderNavigation
}

export type VerticalLayoutSlotProps = {
  SidebarNavigation?: Partial<ComponentProps<typeof SidebarNavigation>>
  HeaderNavigation?: Partial<ComponentProps<typeof HeaderNavigation>>
}

export interface VerticalLayoutProps extends PropsWithChildren {
  slots?: VerticalLayoutSlots
  slotProps?: VerticalLayoutSlotProps
  navData: NavigationData
}
