import { ACCESS_COOKIE_NAME, decodeJWT } from '@baseapp-frontend/utils'
import { IJWTContent } from '@baseapp-frontend/utils/types/jwt'

import Cookies from 'js-cookie'

import { IUser } from '../../../types/user'
import { IUseUser } from './types'

/**
 * @deprecated
 * On the server side:
 * - Prefer using the `getUser` function.
 *
 * On the client side:
 * - If you are using `JWT`, prefer using the `useJWTUser` hook.
 * - If you are using `Simple Token`, prefer using the `useSimpleTokenUser` hook.
 */
const useUser = <TUser extends Partial<IUser> & Partial<IJWTContent>>({
  cookieName = ACCESS_COOKIE_NAME,
}: IUseUser = {}): TUser | null => {
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
