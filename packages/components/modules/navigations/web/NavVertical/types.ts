import { UISettings } from '@baseapp-frontend/design-system/styles/web'

import { SxProps } from '@mui/system'

import { NavigationData } from '../types'

export interface NavVerticalProps {
  settings: UISettings
  setSettings: (newSettings: Partial<UISettings>) => void
  navData: NavigationData
  LogoIcon?: React.FC
  LogoSx?: SxProps
  openNav: boolean
  onCloseNav: VoidFunction
  hideToggleButton?: boolean
}
