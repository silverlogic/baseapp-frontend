import type { FC } from 'react'

import type { CSSProperties } from '@mui/material/styles/createMixins'

import type { AddProfileMenuItemProps } from '../../../../profiles/ProfilePopover/AddProfileMenuItem/types'
import type { ProfilesListProps } from '../../../../profiles/ProfilePopover/ProfilesList/types'
import type { SwitchProfileMenuProps } from '../../../../profiles/ProfilePopover/SwitchProfileMenu/types'
import type { MenuItemProps } from '../types'

export interface AccountPopoverProps {
  PopoverStyles?: CSSProperties
  menuItems?: MenuItemProps[]
  CurrentUser?: FC
  MenuItems?: FC
  CurrentProfile?: FC
  SwitchProfileMenu?: FC<SwitchProfileMenuProps>
  ProfilesList?: FC<ProfilesListProps>
  AddProfileMenuItem?: FC<AddProfileMenuItemProps>
}

export interface SectionController {
  show: boolean
  items: ComponentItems
}

export type ComponentItems = (JSX.Element | FC | null)[]
