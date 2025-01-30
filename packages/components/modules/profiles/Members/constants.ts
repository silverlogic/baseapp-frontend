import { capitalizeFirstLetter } from './utils'

export const NUMBER_OF_MEMBERS_TO_LOAD_NEXT = 5
export const NUMBER_OF_MEMBERS_ON_FIRST_LOAD = 10
export enum MemberStatuses {
  active = 'ACTIVE',
  pending = 'PENDING',
  inactive = 'INACTIVE',
}

export enum MemberRoles {
  admin = 'ADMIN',
  manager = 'MANAGER',
}

export enum MemberActions {
  remove = 'REMOVE',
}

export const roleOptions = [
  {
    value: MemberRoles.admin,
    label: capitalizeFirstLetter(MemberRoles.admin.toLowerCase()),
  },
  {
    value: MemberRoles.manager,
    label: capitalizeFirstLetter(MemberRoles.manager.toLowerCase()),
  },
  {
    value: MemberActions.remove,
    label: capitalizeFirstLetter(MemberActions.remove.toLowerCase()),
  },
]
