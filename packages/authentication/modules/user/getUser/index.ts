import { ACCESS_KEY_NAME } from '@baseapp-frontend/utils/constants/jwt'
import { decodeJWT, getToken } from '@baseapp-frontend/utils/functions/token'
import type { JWTContent } from '@baseapp-frontend/utils/types/jwt'

import type { User } from '../../../types/user'
import type { GetUserOptions } from './types'

const getUser = <TUser extends Partial<User> & JWTContent>({
  accessKeyName = ACCESS_KEY_NAME,
  noSSR = false,
}: GetUserOptions = {}) => {
  const token = getToken(accessKeyName, { noSSR })
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
