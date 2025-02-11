import { NavigationData } from '../types'

export interface NavHorizontalProps {
  navData: NavigationData
  openNav: boolean
  onCloseNav: VoidFunction
  settings?: {
    themeLayout: 'horizontal' | 'vertical' | 'mini' | 'centered'
    themeStretch: boolean
    themeMode: 'light' | 'dark'
    themeContrast: string
    themeColorPresets: string
  }
}
