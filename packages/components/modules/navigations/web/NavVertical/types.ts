import { PartialLogoProps } from '@baseapp-frontend/design-system/components/web/logos'

import { NavigationData } from '../types'

export interface NavVerticalProps {
  navData: NavigationData
  LogoIcon?: React.FC
  LogoProps?: PartialLogoProps
  openNav: boolean
  onCloseNav: VoidFunction
  hideToggleButton?: boolean
}
