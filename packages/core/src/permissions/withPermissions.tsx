import { FC } from 'react'

import { IProps, PermissionOptions, UserWithPermissions } from './types'
import { checkPermissions } from './utils'

export const withPermissions = (Component: FC<any>, options: PermissionOptions = {}) => {
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
