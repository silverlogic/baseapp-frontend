import type { FC } from 'react'

import { CSSProperties } from '@mui/material/styles/createMixins'

import type { MenuItemProps } from '../types'

export interface AccountPopoverProps {
  accountAvatarUrl?: string
  onCloseCallback?: () => void
  menuItems?: MenuItemProps[]
  PopoverStyles?: CSSProperties
  accountSection?: AccountPopoverSection
  menuSection?: AccountPopoverSection
  accountActionsSection?: AccountPopoverSection
  extraSections?: AccountPopoverSection[]
  logoutButtonLabel?: string
  disableCurrentUserPlaceholder?: boolean
  hideLogoutButton?: boolean
}

export interface AccountPopoverSection {
  show: boolean
  items: ComponentItems
}

export type ComponentItems = (JSX.Element | FC | null)[]
