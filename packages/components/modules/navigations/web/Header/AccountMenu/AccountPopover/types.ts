import type { FC } from 'react'

import type { CSSProperties } from '@mui/material/styles/createMixins'

import type {
  AddProfileMenuItemProps,
  ProfilesListProps,
  SwitchProfileMenuProps,
} from '../../../../../profiles/web'
import type { LogoutItemProps } from './LogoutItem/types'
import type { MenuItemsProps } from './MenuItems/types'

export interface AccountPopoverProps {
  PopoverStyles?: CSSProperties
  CurrentUser?: FC | null
  CurrentProfile?: FC | null
  MenuItems?: FC<MenuItemsProps> | null
  MenuItemsProps?: Partial<MenuItemsProps>
  SwitchProfileMenu?: FC<SwitchProfileMenuProps> | null
  SwitchProfileMenuProps?: Partial<SwitchProfileMenuProps>
  ProfilesList?: FC<ProfilesListProps> | null
  ProfilesListProps?: Partial<ProfilesListProps>
  AddProfileMenuItem?: FC<AddProfileMenuItemProps> | null
  AddProfileMenuItemProps?: Partial<AddProfileMenuItemProps>
  LogoutItemProps?: Partial<LogoutItemProps>
}

export interface SectionController {
  show: boolean
  items: ComponentItems
}

export type ComponentItems = (JSX.Element | FC | null)[]
