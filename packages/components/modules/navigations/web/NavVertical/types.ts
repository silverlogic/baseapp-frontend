import { UISettings } from '@baseapp-frontend/design-system/styles/web'

import { PartialLogoProps } from '../Header/types'
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
