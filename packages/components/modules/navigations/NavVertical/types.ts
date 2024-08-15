import { UISettings } from '@baseapp-frontend/design-system'

import { NavigationData } from '../types'

export interface NavVerticalProps {
  settings: UISettings
  setSettings: (newSettings: Partial<UISettings>) => void
  navData: NavigationData
  LogoIcon?: React.FC
  openNav: boolean
  onCloseNav: VoidFunction
  hideToggleButton?: boolean
}
