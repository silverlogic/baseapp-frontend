import type { FC, ReactElement } from 'react'

import type { CSSProperties } from '@mui/material/styles/createMixins'

import type { AddProfileMenuItemProps, ProfilesListProps } from '../../../../../profiles/web'
import { CurrentProfileMenuProps } from './CurrentProfileMenu/types'
import type { LogoutItemProps } from './LogoutItem/types'

export interface AccountPopoverProps
  extends Omit<CurrentProfileMenuProps, 'handlePopoverOnClose' | 'setOpenProfilesList'> {
  PopoverStyles?: CSSProperties
  ProfilesList?: FC<ProfilesListProps>
  ProfilesListProps?: Partial<ProfilesListProps>
  AddProfileMenuItem?: FC<AddProfileMenuItemProps> | null
  AddProfileMenuItemProps?: Partial<AddProfileMenuItemProps>
  LogoutItemProps?: Partial<LogoutItemProps>
}

export interface SectionController {
  show: boolean
  items: ComponentItems
}

export type ComponentItems = (ReactElement | FC | null)[]
