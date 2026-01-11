import { PropsWithChildren } from 'react'

import { DrawerProps } from '@mui/material'

import NavToggleButton from '../../../__shared__/NavToggleButton'
import { NavToggleButtonProps } from '../../../__shared__/NavToggleButton/types'

export interface SidebarMenuRootProps extends PropsWithChildren<DrawerProps> {
  open: boolean
  onClose: () => void
  hideToggleButton?: boolean
  ToggleButton?: typeof NavToggleButton
  ToggleButtonProps?: NavToggleButtonProps
}
