import type { AvatarProps, BoxProps } from '@mui/material'

import type {
  MemberItemFragment$data,
  MemberItemFragment$key,
} from '../../../../../__generated__/MemberItemFragment.graphql'
import type { ProfileItemFragment$key } from '../../../../../__generated__/ProfileItemFragment.graphql'
import { MEMBER_ROLES } from '../constants'

export interface MemberPersonalInformationProps extends BoxProps {
  isActive: boolean
}

/**
 * An entry of a member's menu: a role (`value` is a `ProfileRoles` value, including roles a
 * project declares) or an action (`value` is one of `MEMBER_ACTIONS`).
 */
export interface MemberRoleOption {
  value: string
  label: string
}

/** Display labels keyed by role (`ADMIN`, `OWNER`, ...) or status (`PENDING`, ...) value. */
export type MemberLabels = Partial<Record<string, string>>

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
  /**
   * The row's ProfileUserRole, for a custom `MemberItem` that reads more of it with
   * `MemberItemFragment`. Not set on the owner row.
   */
  memberRef?: MemberItemFragment$key | null
  /**
   * The menu of an active member: the roles they can be given plus actions (`MEMBER_ACTIONS.remove`,
   * and `MEMBER_ACTIONS.deactivate` via `DEACTIVATE_MEMBER_OPTION`). Defaults to Admin, Manager
   * and Remove.
   */
  roleOptions?: MemberRoleOption[]
  /** The menu of a deactivated (INACTIVE) member. Defaults to Reactivate and Remove. */
  inactiveMemberOptions?: MemberRoleOption[]
  /** Labels for roles shown read-only, e.g. `{ OWNER: 'Owner', MANAGER: 'Member' }`. */
  roleLabels?: MemberLabels
  /** Labels for statuses shown in place of a role, e.g. `{ PENDING: 'Invited' }`. */
  statusLabels?: MemberLabels
}
