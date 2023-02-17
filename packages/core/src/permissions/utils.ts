import isEmpty from 'lodash/isEmpty'

import { DEFAULT_ROLES } from './constants'
import { UserWithPermissions, UserWithRole } from './types'

export const isRole = (user: UserWithRole, role: string) => user && user.role === role

export const isAdmin = (user: UserWithRole) => isRole(user, DEFAULT_ROLES.admin)

export const hasPermission = (user: UserWithPermissions, perm: string) =>
  user.permissions.includes(perm)

export const hasAnyPermission = (user: UserWithPermissions, permissions: string[] = []) =>
  permissions.some((perm) => user.permissions.includes(perm))

export const hasAllPermissions = (user: UserWithPermissions, permissions: string[] = []) =>
  permissions.every((perm) => user.permissions.includes(perm))

export const checkPermissions = (
  user: UserWithPermissions,
  any: string[] = [],
  all: string[] = [],
) =>
  (!isEmpty(any) && hasAnyPermission(user, any)) || (!isEmpty(all) && hasAllPermissions(user, all))
