import type { AvatarWithPlaceholderProps } from '@baseapp-frontend/design-system'

import { type MenuItemProps } from '@mui/material'

import {
  ProfileItemFragment$data,
  ProfileItemFragment$key,
} from '../../../../../__generated__/ProfileItemFragment.graphql'

export interface ProfileMenuItemProps {
  profileRef: ProfileItemFragment$key
  onProfileChange: (newProfile: ProfileItemFragment$data) => void
  currentProfile?: ProfileItemFragment$key
  avatarProps?: AvatarWithPlaceholderProps
  width?: number
  height?: number
}

export type StyledMenuItemProps = MenuItemProps & {
  active: boolean
}
