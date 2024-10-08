import { AvatarWithPlaceholderProps } from '@baseapp-frontend/design-system'

import {
  ProfileItemFragment$data,
  ProfileItemFragment$key,
} from '../../../__generated__/ProfileItemFragment.graphql'
import { CurrentProfile } from '../hooks/useCurrentProfile/types'

export interface ProfileMenuItemProps {
  profileRef: ProfileItemFragment$key
  currentProfile: CurrentProfile
  onProfileChange: (newProfile: ProfileItemFragment$data) => void
  avatarProps?: AvatarWithPlaceholderProps
  width?: number
  height?: number
}

export type StyledMenuItemProps = MenuItemProps & {
  active: boolean
}
