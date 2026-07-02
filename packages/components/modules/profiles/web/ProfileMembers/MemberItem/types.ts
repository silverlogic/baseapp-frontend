import type { AvatarProps, BoxProps } from '@mui/material'

import type { MemberItemFragment$data } from '../../../../../__generated__/MemberItemFragment.graphql'
import type { ProfileItemFragment$key } from '../../../../../__generated__/ProfileItemFragment.graphql'
import { MEMBER_ROLES } from '../constants'

export interface MemberPersonalInformationProps extends BoxProps {
  isActive: boolean
}

export interface MemberItemProps {
  member: ProfileItemFragment$key | null | undefined
  memberRole: MemberItemFragment$data['role'] | typeof MEMBER_ROLES.owner
  status: MemberItemFragment$data['status']
  avatarProps?: AvatarProps
  avatarWidth?: number
  avatarHeight?: number
  canChangeMember?: boolean
  userId?: string
  searchQuery?: string
  /** Email the invitation was sent to (for invitations whose user has no account yet). */
  invitedEmail?: string | null
  /** ISO datetime the invitation expires at (used to detect time-based expiry). */
  invitationExpiresAt?: string | null
  /** Relay id of the ProfileUserRole (invitation), used for resend/cancel mutations. */
  invitationId?: string
}
