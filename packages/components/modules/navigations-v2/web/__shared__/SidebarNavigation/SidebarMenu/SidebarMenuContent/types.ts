import type { ComponentProps, PropsWithChildren } from 'react'

import type { ScrollbarProps } from '@baseapp-frontend/design-system/components/web/scrollbars'

import type { NavigationData } from '../../../../types'
import type NavGroup from './NavGroup'
import type NavItem from './NavItem'
import type NavList from './NavList'

export type SidebarMenuContentSlots = {
  NavItem?: typeof NavItem
  NavList?: typeof NavList
  NavGroup?: typeof NavGroup
}

export type SidebarMenuContentSlotProps = {
  NavItem?: Partial<ComponentProps<typeof NavItem>>
  NavList?: Partial<ComponentProps<typeof NavList>>
  NavGroup?: Partial<ComponentProps<typeof NavGroup>>
}

export interface SidebarMenuContentProps extends PropsWithChildren, ScrollbarProps {
  slots?: SidebarMenuContentSlots
  slotProps?: SidebarMenuContentSlotProps
  navData?: NavigationData
}
