import { LoadingStateProps } from '@baseapp-frontend/design-system/components/web/displays'

import type { ProfileMenuItemProps } from './ProfileMenuItem/types'

export interface ProfilesListProps {
  openSubmenu: boolean
  handleCloseSubmenu: () => void
  cancelLabel?: string
  listMaxHeight?: number
  MenuItemProps?: Partial<ProfileMenuItemProps>
  LoadingStateProps?: LoadingStateProps
}
