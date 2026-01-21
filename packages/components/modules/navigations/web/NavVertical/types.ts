import { PartialLogoProps } from '@baseapp-frontend/design-system/components/web/logos'

import { DrawerProps, IconButtonProps } from '@mui/material'

import { NavigationData, SlotProps } from '../types'

export interface NavVerticalProps {
  navData: NavigationData
  LogoIcon?: React.FC
  LogoProps?: PartialLogoProps
  openNav: boolean
  onCloseNav: VoidFunction
  hideToggleButton?: boolean
  slotProps?: SlotProps
  VerticalDrawerProps?: Partial<DrawerProps>
  NavToggleButtonProps?: Partial<IconButtonProps>
}
