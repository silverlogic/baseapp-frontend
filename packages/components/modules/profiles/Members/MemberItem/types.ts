import type { AvatarProps, BoxProps } from '@mui/material'

import { MemberItemFragment$data } from '../../../../__generated__/MemberItemFragment.graphql'
import type { ProfileItemFragment$key } from '../../../../__generated__/ProfileItemFragment.graphql'

export interface MemberPersonalInformationProps extends BoxProps {
  isActive: boolean
}

export interface MemberItemProps {
  member: ProfileItemFragment$key | null | undefined
  memberRole: MemberItemFragment$data['role'] | 'owner'
  status: MemberItemFragment$data['status']
  avatarProps?: AvatarProps
  avatarWidth?: number
  avatarHeight?: number
}
