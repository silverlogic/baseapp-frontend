import { MenuItemProps } from '../types'

export interface AccountPopoverProps {
  menuItems?: MenuItemProps[]
  logoutButtonLabel?: string
  switchProfileLabel?: string
  hideLogoutButton?: boolean
}
