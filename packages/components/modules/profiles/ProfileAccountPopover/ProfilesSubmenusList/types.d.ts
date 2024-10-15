import { ProfileMenuItemProps } from '../ProfileMenuItem/types'

export interface ProfilesSubmenusListProps {
  openSubmenu: boolean
  handleCloseSubmenu: () => void
  cancelLabel?: string
  listMaxHeight?: number
  MenuItemProps?: Partial<ProfileMenuItemProps>
}
