import { capitalizeFirstLetter } from './utils'

export const NUMBER_OF_MEMBERS_TO_LOAD_NEXT = 5
export const NUMBER_OF_MEMBERS_ON_FIRST_LOAD = 10

export const MEMBER_STATUSES = {
  active: 'ACTIVE',
  pending: 'PENDING',
  inactive: 'INACTIVE',
  expired: 'EXPIRED',
} as const

export const MEMBER_ROLES = {
  admin: 'ADMIN',
  manager: 'MANAGER',
} as const

export const MEMBER_ACTIONS = {
  resendInvitation: 'RESEND_INVITATION',
  remove: 'REMOVE',
}

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
