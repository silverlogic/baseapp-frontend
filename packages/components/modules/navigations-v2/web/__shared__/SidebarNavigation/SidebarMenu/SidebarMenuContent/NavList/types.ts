import type { ComponentProps } from 'react'

import type SidebarMenuNavGroup from '../../../../../primitives/SidebarMenuNavGroup'
import type SidebarMenuNavItem from '../../../../../primitives/SidebarMenuNavItem'
import type { NavListData } from '../../../../../types'

export type NavListSlots = {
  Root?: typeof SidebarMenuNavGroup.Root
  Header?: typeof SidebarMenuNavItem
  ListRoot?: typeof SidebarMenuNavGroup.Content
  ListItem?: typeof SidebarMenuNavItem
}

export type NavListSlotProps = {
  Root?: Partial<ComponentProps<typeof SidebarMenuNavGroup.Root>>
  Header?: Partial<ComponentProps<typeof SidebarMenuNavItem.Root>>
  ListRoot?: Partial<ComponentProps<typeof SidebarMenuNavGroup.Content>>
  ListItem?: Partial<ComponentProps<typeof SidebarMenuNavItem.Root>>
}

export interface NavListProps {
  navList: NavListData
  slots?: NavListSlots
  slotProps?: NavListSlotProps
}
