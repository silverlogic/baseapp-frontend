import { ComponentProps, PropsWithChildren } from 'react'

import HorizontalLayout from '../layouts/HorizontalLayout'
import type SidebarLayout from '../layouts/SidebarLayout'
import VerticalLayout from '../layouts/VerticalLayout'
import type { NavigationData } from '../types'

/**
 * Each slot corresponds to a layout type and accepts a custom component
 * that replaces the default layout implementation.
 *
 * This can be extended with additional slots to support new layout types.
 */
export interface NavigationLayoutSlots {
  /** Custom component for the sidebar navigation layout. */
  sidebar?: typeof SidebarLayout
  /** Custom component for the vertical navigation layout. */
  vertical?: typeof VerticalLayout
  /** Custom component for the horizontal navigation layout. */
  horizontal?: typeof HorizontalLayout
}

export interface NavigationLayoutSlotProps {
  sidebar?: Partial<ComponentProps<typeof SidebarLayout>>
  vertical?: Partial<ComponentProps<typeof VerticalLayout>>
  horizontal?: Partial<ComponentProps<typeof HorizontalLayout>>
}

export interface NavigationLayoutProps extends PropsWithChildren {
  /**
   * Override default layout components by providing custom implementations per layout type.
   */
  slots?: NavigationLayoutSlots
  slotProps?: NavigationLayoutSlotProps
  navData: NavigationData
}
