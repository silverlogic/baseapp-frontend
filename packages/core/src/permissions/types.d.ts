export interface UserWithPermissions {
  permissions: string[]
}

export interface UserWithRole {
  role: string
}

export type PermissionOptions = {
  any?: string[]
  all?: string[]
  PermissionDeniedComponent?: any
  hide?: boolean
}

export interface IProps {
  user?: object
}
