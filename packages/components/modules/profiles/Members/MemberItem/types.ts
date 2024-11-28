import type { AvatarProps, BoxProps } from '@mui/material'

import type { ProfileItemFragment$key } from '../../../../__generated__/ProfileItemFragment.graphql'
import type {
  ProfileRoleStatus,
  ProfileRoles,
} from '../../../../__generated__/UserMembersListFragment.graphql'

export interface IMemberPersonalInformation extends BoxProps {
  isActive: boolean
}

export interface MemberItemProps {
  member: ProfileItemFragment$key | null | undefined
  memberRole: ProfileRoles | 'owner'
  status: ProfileRoleStatus
  userId?: string
  avatarProps?: AvatarProps
  avatarWidth?: number
  avatarHeight?: number
  canChangeMember?: boolean
}
