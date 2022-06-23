import { checkPermissions } from './utils'
import { UserWithPermissions, PermissionOptions, IProps } from './types'

export const withPermissions = (Component: React.FC<any>, options: PermissionOptions = {}) => {
  const { all, any, PermissionDeniedComponent, hide } = options

  return (props: IProps) => {
    const { user } = props
    const NotEnoughPermissions =
      PermissionDeniedComponent ??
      (() => <p>You don&apos;t have enough permissions to access this page!</p>)

    if (!checkPermissions(user as UserWithPermissions, any, all)) {
      return hide ? null : <NotEnoughPermissions />
    }

    return <Component {...props} />
  }
}
