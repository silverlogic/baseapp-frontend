import { AvatarProps } from '@mui/material'

import { ProfileRoleStatus } from '../../../../__generated__/MemberItemFragment.graphql'
import { ProfileItemFragment$key } from '../../../../__generated__/ProfileItemFragment.graphql'
import { MembersListProps } from './MembersList/types'

export interface ProfileMembersProps {
  MembersListProps?: Partial<MembersListProps>
  title?: string
  subtitle?: string
}

export interface MemberPersonalInfoProps {
  avatarProps?: AvatarProps
  avatarWidth?: number
  avatarHeight?: number
  member?: ProfileItemFragment$key
  status?: ProfileRoleStatus | null
  children?: React.ReactNode
  isActive?: boolean
}
