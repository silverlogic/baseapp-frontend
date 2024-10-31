import type { MenuItemProps } from '../../types'

export interface MenuItemsProps {
  menuItems: MenuItemProps[]
  handlePopoverOnClose: () => void
}
