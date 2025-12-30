import { FC } from 'react'

import { PartialLogoProps } from '@baseapp-frontend/design-system/components/web/logos'

import { AccountMenuProps } from '../Header/AccountMenu/types'
import { NavigationData } from '../types'

export interface NavVerticalProps {
  navData: NavigationData
  LogoIcon?: React.FC
  LogoProps?: PartialLogoProps
  openNav: boolean
  onCloseNav: VoidFunction
  hideToggleButton?: boolean
  AccountMenu?: FC<AccountMenuProps>
  AccountMenuProps?: Partial<AccountMenuProps>
}
