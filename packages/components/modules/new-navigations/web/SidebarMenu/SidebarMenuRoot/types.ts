import { PropsWithChildren } from 'react'

import { DrawerProps, StackProps } from '@mui/material'

import NavToggleButton from '../../../../navigations/web/__shared__/NavToggleButton'
import { NavToggleButtonProps } from '../../../../navigations/web/__shared__/NavToggleButton/types'

export interface SidebarMenuRootProps extends PropsWithChildren<DrawerProps> {
  open: boolean
  onClose: () => void
  collapsible?: boolean
  ToggleButton?: typeof NavToggleButton
  ToggleButtonProps?: NavToggleButtonProps
  DrawerProps?: DrawerProps
  ContainerProps?: StackProps
}
