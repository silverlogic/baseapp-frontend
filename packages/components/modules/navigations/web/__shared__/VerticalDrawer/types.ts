import { PartialLogoProps } from '@baseapp-frontend/design-system/components/web/logos'

import { DrawerProps } from '@mui/material'

import { NavigationData } from '../../types'

export interface VerticalDrawerProps {
  navData: NavigationData
  LogoIcon?: React.FC
  LogoProps?: PartialLogoProps
  openNav: boolean
  onCloseNav: VoidFunction
  DrawerProps?: Partial<DrawerProps>
}
