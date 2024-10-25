import type { FC } from 'react'

import { CSSProperties } from '@mui/material/styles/createMixins'

import type { MenuItemProps } from '../types'

export interface AccountPopoverProps {
  accountAvatarUrl?: string
  onCloseCallback?: () => void
  menuItems?: MenuItemProps[]
  PopoverStyles?: CSSProperties
  accountInfoSectionController?: SectionController
  menuItemsSectionController?: SectionController
  menuActionsSectionController?: SectionController
  extraSectionControllersList?: SectionController[]
  logoutButtonLabel?: string
  disableCurrentUserPlaceholder?: boolean
  hideLogoutButton?: boolean
}

export interface SectionController {
  show: boolean
  items: ComponentItems
}

export type ComponentItems = (JSX.Element | FC | null)[]
