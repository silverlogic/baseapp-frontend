import { checkPermissions } from './utils'
import { UserWithPermissions, PermissionOptions } from './types'

export const withPermissions = (Component, options: PermissionOptions = {}) => {
  const { all, any, PermissionDeniedComponent, hide } = options

  return (props) => {
    const { user } = props
    const NotEnoughPermissions =
      PermissionDeniedComponent ??
      (() => <p>You don't have enough permissions to access this page!</p>)

    if (!checkPermissions(user as UserWithPermissions, any, all)) {
      return hide ? null : <NotEnoughPermissions />
    }

    return <Component {...props} />
  }
}
