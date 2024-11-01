import type { MenuItemProps } from '../../types'

export interface MenuItemsProps {
  handlePopoverOnClose: () => void
  menuItems?: MenuItemProps[]
}
