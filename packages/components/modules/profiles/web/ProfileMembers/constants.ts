import { MessageDescriptor, defineMessages } from 'react-intl'

export const NUMBER_OF_MEMBERS_TO_LOAD_NEXT = 5
export const NUMBER_OF_MEMBERS_ON_FIRST_LOAD = 10

export const MEMBER_STATUSES = {
  active: 'ACTIVE',
  pending: 'PENDING',
  inactive: 'INACTIVE',
  declined: 'DECLINED',
  expired: 'EXPIRED',
} as const

export const INVITATION_ACTIONS = {
  resend: 'RESEND',
  remove: 'REMOVE',
} as const

export const MEMBER_MESSAGES = defineMessages({
  resendInvitation: {
    id: 'profiles.members.actions.resendInvitation',
    defaultMessage: 'Resend Invitation',
  },
  remove: {
    id: 'profiles.members.actions.remove',
    defaultMessage: 'Remove',
  },
  admin: {
    id: 'profiles.members.roles.admin',
    defaultMessage: 'Admin',
  },
  manager: {
    id: 'profiles.members.roles.manager',
    defaultMessage: 'Manager',
  },
  owner: {
    id: 'profiles.members.roles.owner',
    defaultMessage: 'Owner',
  },
  active: {
    id: 'profiles.members.statuses.active',
    defaultMessage: 'Active',
  },
  pending: {
    id: 'profiles.members.statuses.pending',
    defaultMessage: 'Pending',
  },
  inactive: {
    id: 'profiles.members.statuses.inactive',
    defaultMessage: 'Inactive',
  },
  declined: {
    id: 'profiles.members.statuses.declined',
    defaultMessage: 'Declined',
  },
  expired: {
    id: 'profiles.members.statuses.expired',
    defaultMessage: 'Expired',
  },
})

export const invitationActionOptions = [
  { value: INVITATION_ACTIONS.resend, label: MEMBER_MESSAGES.resendInvitation },
  { value: INVITATION_ACTIONS.remove, label: MEMBER_MESSAGES.remove },
]

export const MEMBER_ROLES = {
  admin: 'ADMIN',
  manager: 'MANAGER',
  owner: 'OWNER',
} as const

export const MEMBER_ACTIONS = {
  remove: 'REMOVE',
}

export const roleOptions = [
  { value: MEMBER_ROLES.admin, label: MEMBER_MESSAGES.admin },
  { value: MEMBER_ROLES.manager, label: MEMBER_MESSAGES.manager },
  { value: MEMBER_ACTIONS.remove, label: MEMBER_MESSAGES.remove },
]

export const MEMBER_ROLE_AND_STATUS_MESSAGES: Record<string, MessageDescriptor> = {
  [MEMBER_ROLES.admin]: MEMBER_MESSAGES.admin,
  [MEMBER_ROLES.manager]: MEMBER_MESSAGES.manager,
  [MEMBER_ROLES.owner]: MEMBER_MESSAGES.owner,
  [MEMBER_STATUSES.active]: MEMBER_MESSAGES.active,
  [MEMBER_STATUSES.pending]: MEMBER_MESSAGES.pending,
  [MEMBER_STATUSES.inactive]: MEMBER_MESSAGES.inactive,
  [MEMBER_STATUSES.declined]: MEMBER_MESSAGES.declined,
  [MEMBER_STATUSES.expired]: MEMBER_MESSAGES.expired,
}
