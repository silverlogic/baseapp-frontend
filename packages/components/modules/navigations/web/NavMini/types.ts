import { FC } from 'react'

import { PartialLogoProps } from '@baseapp-frontend/design-system/components/web/logos'

import { AccountMenuProps } from '../Header/AccountMenu/types'
import { NavigationData } from '../types'

export interface NavMiniProps {
  navData: NavigationData
  openNav: boolean
  onCloseNav: VoidFunction
  LogoIcon?: React.FC
  LogoProps?: PartialLogoProps
  hideToggleButton?: boolean
  AccountMenu?: FC<AccountMenuProps>
  AccountMenuProps?: Partial<AccountMenuProps>
}
