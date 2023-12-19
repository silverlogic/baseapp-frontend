import { ACCESS_COOKIE_NAME } from '@baseapp-frontend/utils/constants/cookie'
import { decodeJWT, getToken } from '@baseapp-frontend/utils/functions/token'
import { IJWTContent } from '@baseapp-frontend/utils/types/jwt'

import { IUser } from '../../../types/user'
import { GetUserOptions } from './types'

const getUser = <TUser extends Partial<IUser> & IJWTContent>({
  cookieName = ACCESS_COOKIE_NAME,
}: GetUserOptions = {}) => {
  const token = getToken(cookieName)
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
