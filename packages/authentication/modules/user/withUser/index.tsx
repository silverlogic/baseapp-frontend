import { FC } from 'react'

import { IJWTContent } from '@baseapp-frontend/utils'

import getUser from '../getUser'
import { ComponentWithUser } from './types'

/**
 * HOC to provide the `user` object to the component.
 *
 * It's useful when the component that needs to call `getUser` and can't be async (e.g. Client Components).
 *
 * Consider rendering the Component using the `ComponentWithUser` interface to inherit the `user` type.
 * You may need to import the component using dynamic imports with `next/dynamic`.
 *
 * @example Defining and exporting a component with `withUser`:
 * ```tsx
 * import { FC } from 'react'
 *
 * import {ComponentWithUser, withUser} from '@baseapp/authentication'
 *
 * const MyComponent: FC<ComponentWithUser<MyUser>> = ({user}) => <div>Hi {user.firstName}</div>
 *
 * export default withUser<MyUser>(MyComponent)
 * ```
 * @example Importing a component with `withUser` using `next/dynamic`:
 * ```tsx
 * import dynamic from 'next/dynamic'
 *
 * const MyComponent = dynamic(() => import('./MyComponent'), { ssr: false })
 *
 * (...)
 * ```
 */
const withUser =
  <TUser extends IJWTContent, Props extends object = {}>(
    Component: FC<Props & ComponentWithUser<TUser>>,
  ) =>
  async (props: Props) => {
    const user = await getUser<TUser>()

    return <Component {...props} user={user} />
  }

export default withUser
