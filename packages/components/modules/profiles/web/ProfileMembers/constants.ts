import { capitalizeFirstLetter } from './utils'

export const NUMBER_OF_MEMBERS_TO_LOAD_NEXT = 5
export const NUMBER_OF_MEMBERS_ON_FIRST_LOAD = 10

export const MEMBER_STATUSES = {
  active: 'ACTIVE',
  pending: 'PENDING',
  inactive: 'INACTIVE',
  declined: 'DECLINED',
  expired: 'EXPIRED',
  cancelled: 'CANCELLED',
} as const

export const INVITATION_ACTIONS = {
  resend: 'RESEND',
  remove: 'REMOVE',
} as const

export const invitationActionOptions = [
  { value: INVITATION_ACTIONS.resend, label: 'Resend Invitation' },
  { value: INVITATION_ACTIONS.remove, label: 'Remove' },
]

export const MEMBER_ROLES = {
  admin: 'ADMIN',
  manager: 'MANAGER',
  owner: 'OWNER',
} as const

export const MEMBER_ACTIONS = {
  remove: 'REMOVE',
  deactivate: 'DEACTIVATE',
  reactivate: 'REACTIVATE',
} as const

export const roleOptions = [
  {
    value: MEMBER_ROLES.admin,
    label: capitalizeFirstLetter(MEMBER_ROLES.admin.toLowerCase()),
  },
  {
    value: MEMBER_ROLES.manager,
    label: capitalizeFirstLetter(MEMBER_ROLES.manager.toLowerCase()),
  },
  {
    value: MEMBER_ACTIONS.remove,
    label: capitalizeFirstLetter(MEMBER_ACTIONS.remove.toLowerCase()),
  },
]

/**
 * Add to `roleOptions` to let admins deactivate an active member from the role menu. Not in the
 * default options: deactivation needs a backend with `profileMemberDeactivate`.
 */
export const DEACTIVATE_MEMBER_OPTION = {
  value: MEMBER_ACTIONS.deactivate,
  label: capitalizeFirstLetter(MEMBER_ACTIONS.deactivate.toLowerCase()),
}

/**
 * Pass as `inactiveMemberOptions` to offer Reactivate and Remove on a deactivated (INACTIVE) member
 * to those who can change members. Not the default: reactivation needs a backend with
 * `profileMemberReactivate`, and without it an INACTIVE row shows its status read-only.
 */
export const inactiveMemberActionOptions = [
  {
    value: MEMBER_ACTIONS.reactivate,
    label: capitalizeFirstLetter(MEMBER_ACTIONS.reactivate.toLowerCase()),
  },
  {
    value: MEMBER_ACTIONS.remove,
    label: capitalizeFirstLetter(MEMBER_ACTIONS.remove.toLowerCase()),
  },
]
