import { UISettings } from '@baseapp-frontend/design-system/styles/web'

import { SxProps } from '@mui/system'

import { NavigationData } from '../types'

export interface NavMiniProps {
  navData: NavigationData
  openNav: boolean
  onCloseNav: VoidFunction
  settings: UISettings
  setSettings: (newSettings: Partial<UISettings>) => void
  LogoIcon?: React.FC
  LogoSx?: SxProps
  hideToggleButton?: boolean
}
