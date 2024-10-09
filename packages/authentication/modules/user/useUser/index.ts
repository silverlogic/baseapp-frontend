import { ACCESS_KEY_NAME, decodeJWT } from '@baseapp-frontend/utils'
import type { JWTContent } from '@baseapp-frontend/utils/types/jwt'

import Cookies from 'js-cookie'

import type { User } from '../../../types/user'
import type { UseUserOptions } from './types'

/**
 * @deprecated
 * On the server side:
 * - Prefer using the `getUser` function.
 *
 * On the client side:
 * - Prefer using the `useJWTUser` hook.
 */
const useUser = <TUser extends Partial<User> & Partial<JWTContent>>({
  accessKeyName = ACCESS_KEY_NAME,
}: UseUserOptions = {}): TUser | null => {
  const token = Cookies.get(accessKeyName)
  if (token) {
    try {
      return decodeJWT<TUser>(token) as TUser
    } catch (error) {
      return null
    }
  }
  return null
}

export default useUser
