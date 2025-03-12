import { UISettings } from '@baseapp-frontend/design-system/styles/web'

import { PartialLogoProps } from '../Header/types'
import { NavigationData } from '../types'

export interface NavMiniProps {
  navData: NavigationData
  openNav: boolean
  onCloseNav: VoidFunction
  settings: UISettings
  setSettings: (newSettings: Partial<UISettings>) => void
  LogoIcon?: React.FC
  LogoProps?: PartialLogoProps
  hideToggleButton?: boolean
}
