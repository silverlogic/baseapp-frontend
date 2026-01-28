import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import SidebarMenu from '../SidebarMenu'
import { NavigationData } from '../types'
import { SlotsOptions } from '../NavigationLayout/types'

export type Slot<T extends ElementType> = T

export interface SidebarNavigationSlots {
  Layout?: ElementType
  MainContainer?: ElementType  
  SidebarRoot?: Slot<typeof SidebarMenu.Root>
  SidebarHeader?: Slot<typeof SidebarMenu.Header>
  SidebarContent?: Slot<typeof SidebarMenu.Content>
  SidebarFooter?: Slot<typeof SidebarMenu.Footer>
}

export interface SidebarDefaultNavigationSlots {
  NavItem?: Slot<ElementType>
  NavList?: Slot<ElementType>
  NavGroup?: Slot<ElementType>
}

export interface SidebarNavigationProps {
  slots: Record<SlotsOptions, SidebarNavigationSlots>
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  navData: NavigationData
}
