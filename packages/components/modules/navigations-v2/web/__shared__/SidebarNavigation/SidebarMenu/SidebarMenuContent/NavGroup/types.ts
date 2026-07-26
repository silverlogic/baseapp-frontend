import { ComponentProps, Key, ReactNode } from 'react'

import SidebarMenuNavGroup from '../../../../../primitives/SidebarMenuNavGroup'
import type { NavGroupData, NavItemData, NavListData } from '../../../../../types'

export type RenderProps = {
  open: boolean
  handleToggle: () => void
}

export type NavGroupSlots = {
  Root?: typeof SidebarMenuNavGroup.Root
  Header?: typeof SidebarMenuNavGroup.Header
  Content?: typeof SidebarMenuNavGroup.Content
}

export type NavGroupSlotProps = {
  Root?: Partial<ComponentProps<typeof SidebarMenuNavGroup.Root>>
  Header?: Partial<ComponentProps<typeof SidebarMenuNavGroup.Header>>
  Content?: Partial<ComponentProps<typeof SidebarMenuNavGroup.Content>>
}

export interface NavGroupProps {
  slots?: NavGroupSlots
  slotProps?: NavGroupSlotProps
  navGroup: NavGroupData
  renderNav: (nav: NavItemData | NavListData | NavGroupData, key?: Key) => ReactNode
}
