import { FC, PropsWithChildren } from 'react'

import { Drawer } from '@mui/material'

import SidebarMenuContentSlot from './SidebarMenuContentSlot'
import SidebarMenuFooterSlot from './SidebarMenuFooterSlot'
import SidebarMenuHeaderSlot from './SidebarMenuHeaderSlot'
import SidebarMenuRoot from './SidebarMenuRoot'

const SidebarMenu = {
  Root: SidebarMenuRoot,
  Header: SidebarMenuHeaderSlot,
  Content: SidebarMenuContentSlot,
  Footer: SidebarMenuFooterSlot,
}
export default SidebarMenu
