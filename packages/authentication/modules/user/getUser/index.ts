import { ACCESS_COOKIE_NAME } from '@baseapp-frontend/utils/constants/cookie'
import { decodeJWT, getToken } from '@baseapp-frontend/utils/functions/token'
import { JWTContent } from '@baseapp-frontend/utils/types/jwt'

import { User } from '../../../types/user'
import { GetUserOptions } from './types'

const getUser = <TUser extends Partial<User> & JWTContent>({
  cookieName = ACCESS_COOKIE_NAME,
  noSSR = false,
}: GetUserOptions = {}) => {
  const token = getToken(cookieName, { noSSR })
  if (token) {
    try {
      const user = decodeJWT<TUser>(token)
      return user
    } catch (error) {
      return null
    }
  }
  return null
}

export default getUser
