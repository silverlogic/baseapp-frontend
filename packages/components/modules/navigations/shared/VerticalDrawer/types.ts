import { NavigationData } from '../../types'

export interface VerticalDrawerProps {
  navData: NavigationData
  LogoIcon?: React.FC
  openNav: boolean
  onCloseNav: VoidFunction
}
