import { ComponentProps, PropsWithChildren } from 'react'

import { BoxProps } from '@mui/material'

import type Content from './Content'

export type SidebarMenuFooterSlots = {
  Content?: typeof Content
}

export type SidebarMenuFooterSlotProps = {
  Content?: Partial<ComponentProps<typeof Content>>
}

export interface SidebarMenuFooterProps extends PropsWithChildren, BoxProps {
  slots?: SidebarMenuFooterSlots
  slotProps?: SidebarMenuFooterSlotProps
}
