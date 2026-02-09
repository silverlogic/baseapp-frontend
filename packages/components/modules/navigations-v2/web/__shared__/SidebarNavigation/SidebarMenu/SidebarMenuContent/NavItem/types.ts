import type { ComponentProps } from 'react'

import type SidebarMenuNavItem from '../../../../../primitives/SidebarMenuNavItem'
import type { NavItemData } from '../../../../../types'

export type NavItemSlots = {
  Root?: typeof SidebarMenuNavItem.Root
  Icon?: typeof SidebarMenuNavItem.Icon
  Title?: typeof SidebarMenuNavItem.Title
}

export type NavItemSlotProps = {
  Root?: Partial<ComponentProps<typeof SidebarMenuNavItem.Root>>
  Icon?: Partial<ComponentProps<typeof SidebarMenuNavItem.Icon>>
  Title?: Partial<ComponentProps<typeof SidebarMenuNavItem.Title>>
}

export interface NavItemProps extends NavItemData {
  slots?: NavItemSlots
  slotProps?: NavItemSlotProps
}
