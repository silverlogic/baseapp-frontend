import { ProfileMenuItemProps } from '../ProfileMenuItem/types'

export interface ProfilesListProps {
  openSubmenu: boolean
  handleCloseSubmenu: () => void
  cancelLabel?: string
  listMaxHeight?: number
  MenuItemProps?: Partial<ProfileMenuItemProps>
}
