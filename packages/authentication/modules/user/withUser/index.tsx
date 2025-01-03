import type { FC } from 'react'

import type { JWTContent } from '@baseapp-frontend/utils'

import getUser from '../getUser'
import type { ComponentWithUser } from './types'

/**
 * HOC to provide the `user` object to the component as a prop.
 *
 * Consider rendering the Component using the `ComponentWithUser` interface to inherit the `user` type.
 *
 * ```
 */
const withUser =
  <TUser extends JWTContent, Props extends object = {}>(
    Component: FC<Props & ComponentWithUser<TUser>>,
  ) =>
  (props: Props) => {
    const user = getUser<TUser>()

    return <Component {...props} user={user} />
  }

export default withUser
