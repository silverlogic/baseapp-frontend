import type { AvatarWithPlaceholderProps } from '@baseapp-frontend/design-system'

import { type MenuItemProps } from '@mui/material'

import type {
  ProfileItemInlineFragment$data,
  ProfileItemInlineFragment$key,
} from '../../../../../__generated__/ProfileItemInlineFragment.graphql'

export interface ProfileMenuItemProps {
  profileRef: ProfileItemInlineFragment$key
  onProfileChange: (newProfile: ProfileItemInlineFragment$data) => void
  currentProfile?: ProfileItemInlineFragment$data
  avatarProps?: AvatarWithPlaceholderProps
  width?: number
  height?: number
}

export type StyledMenuItemProps = MenuItemProps & {
  active: boolean
}
