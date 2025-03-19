import { PartialLogoProps } from '@baseapp-frontend/design-system/components/web/logos'
import { UISettings } from '@baseapp-frontend/design-system/styles/web'

import { NavigationData } from '../types'

export interface NavVerticalProps {
  settings: UISettings
  setSettings: (newSettings: Partial<UISettings>) => void
  navData: NavigationData
  LogoIcon?: React.FC
  LogoProps?: PartialLogoProps
  openNav: boolean
  onCloseNav: VoidFunction
  hideToggleButton?: boolean
}
