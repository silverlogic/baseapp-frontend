import { ComponentProps, PropsWithChildren } from 'react'

import type { NavigationData } from '../../types'
import type MainContainer from '../MainContainer'
import type Layout from './Layout'
import type SidebarMenu from './SidebarMenu'

export interface SidebarNavigationSlots {
  Layout?: typeof Layout
  MainContainer?: typeof MainContainer
  SidebarRoot?: typeof SidebarMenu.Root
  SidebarHeader?: typeof SidebarMenu.Header
  SidebarContent?: typeof SidebarMenu.Content
  SidebarFooter?: typeof SidebarMenu.Footer
}

export interface SidebarNavigationSlotProps {
  Layout?: Partial<ComponentProps<typeof Layout>>
  MainContainer?: Partial<ComponentProps<typeof MainContainer>>
  SidebarRoot?: Partial<ComponentProps<typeof SidebarMenu.Root>>
  SidebarHeader?: Partial<ComponentProps<typeof SidebarMenu.Header>>
  SidebarContent?: Partial<ComponentProps<typeof SidebarMenu.Content>>
  SidebarFooter?: Partial<ComponentProps<typeof SidebarMenu.Footer>>
}

export interface SidebarNavigationProps extends PropsWithChildren {
  slots?: SidebarNavigationSlots
  slotProps?: SidebarNavigationSlotProps
  collapsible?: boolean
  isDrawerOpen: boolean
  onDrawerToggle: () => void
  navData: NavigationData
}
