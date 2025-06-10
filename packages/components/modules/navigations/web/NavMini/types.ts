import { PartialLogoProps } from '@baseapp-frontend/design-system/components/web/logos'

import { NavigationData } from '../types'

export interface NavMiniProps {
  navData: NavigationData
  openNav: boolean
  onCloseNav: VoidFunction
  LogoIcon?: React.FC
  LogoProps?: PartialLogoProps
  hideToggleButton?: boolean
}
