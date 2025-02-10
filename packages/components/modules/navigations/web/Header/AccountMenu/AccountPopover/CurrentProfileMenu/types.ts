import { FC } from 'react'

import { SwitchProfileMenuProps } from '../../../../../../profiles/web'
import { MenuItemsProps } from '../MenuItems/types'

export interface CurrentProfileMenuProps {
  CurrentUser?: FC
  CurrentProfile?: FC
  MenuItems?: FC<MenuItemsProps>
  MenuItemsProps?: Partial<MenuItemsProps>
  SwitchProfileMenu?: FC<SwitchProfileMenuProps>
  SwitchProfileMenuProps?: Partial<SwitchProfileMenuProps>
  handlePopoverOnClose: () => void
  setOpenProfilesList: (open: boolean) => void
}
