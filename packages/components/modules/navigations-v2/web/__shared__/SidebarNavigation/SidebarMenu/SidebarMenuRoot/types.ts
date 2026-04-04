import { PropsWithChildren } from 'react'

import { DrawerProps, StackProps } from '@mui/material'

import { NavigationDrawerProps } from '../../../NavigationDrawer/types'
import ToggleButton from '../../ToggleButton'
import { ToggleButtonProps } from '../../ToggleButton/types'

export interface SidebarMenuRootProps extends PropsWithChildren<DrawerProps> {
  isDrawerOpen: boolean
  onDrawerToggle: () => void
  collapsible?: boolean
  ToggleButton?: typeof ToggleButton
  ToggleButtonProps?: ToggleButtonProps
  NavigationDrawerProps?: NavigationDrawerProps
  ContainerProps?: StackProps
}
