import { ACCESS_KEY_NAME } from '@baseapp-frontend/utils/constants/jwt'
import { decodeJWT } from '@baseapp-frontend/utils/functions/token/decodeJWT'
import { getTokenAsync } from '@baseapp-frontend/utils/functions/token/getTokenAsync'
import type { JWTContent } from '@baseapp-frontend/utils/types/jwt'

import type { User } from '../../../types/user'
import type { GetUserAsyncOptions } from './types'

const getUserAsync = async <TUser extends Partial<User> & JWTContent>({
  key = ACCESS_KEY_NAME,
  noSSR = false,
}: GetUserAsyncOptions = {}) => {
  const token = await getTokenAsync(key, { noSSR })
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

export default getUserAsync
