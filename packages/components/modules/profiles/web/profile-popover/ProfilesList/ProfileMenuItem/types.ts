import type { AvatarWithPlaceholderProps } from '@baseapp-frontend/design-system/components/web/avatars'

import { type MenuItemProps } from '@mui/material'

import type {
  ProfileItemFragment$data,
  ProfileItemFragment$key,
} from '../../../../../../__generated__/ProfileItemFragment.graphql'

export interface ProfileMenuItemProps {
  profileRef: ProfileItemFragment$key
  onProfileChange: (newProfile: ProfileItemFragment$data) => void
  currentProfile?: ProfileItemFragment$data
  avatarProps?: AvatarWithPlaceholderProps
  width?: number
  height?: number
}

export type StyledMenuItemProps = MenuItemProps & {
  active: boolean
}
