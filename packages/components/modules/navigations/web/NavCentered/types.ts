import { DrawerProps } from '@mui/material'

import { NavigationData, SlotProps } from '../types'

export interface NavCenteredProps {
  navData: NavigationData
  openNav: boolean
  onCloseNav: VoidFunction
  slotProps?: SlotProps
  VerticalDrawerProps?: Partial<DrawerProps>
}
