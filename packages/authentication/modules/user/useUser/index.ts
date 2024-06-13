import { ACCESS_COOKIE_NAME, decodeJWT } from '@baseapp-frontend/utils'
import { JWTContent } from '@baseapp-frontend/utils/types/jwt'

import Cookies from 'js-cookie'

import { User } from '../../../types/user'
import { UseUserOptions } from './types'

/**
 * @deprecated
 * On the server side:
 * - Prefer using the `getUser` function.
 *
 * On the client side:
 * - If you are using `JWT`, prefer using the `useJWTUser` hook.
 * - If you are using `Simple Token`, prefer using the `useSimpleTokenUser` hook.
 */
const useUser = <TUser extends Partial<User> & Partial<JWTContent>>({
  cookieName = ACCESS_COOKIE_NAME,
}: UseUserOptions = {}): TUser | null => {
  const token = Cookies.get(cookieName)
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
