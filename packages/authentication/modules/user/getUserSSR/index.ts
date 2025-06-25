import { ACCESS_KEY_NAME } from '@baseapp-frontend/utils/constants/jwt'
import { decodeJWT } from '@baseapp-frontend/utils/functions/token/decodeJWT'
import { getTokenSSR } from '@baseapp-frontend/utils/functions/token/getTokenSSR'
import type { JWTContent } from '@baseapp-frontend/utils/types/jwt'

import type { User } from '../../../types/user'
import type { GetUserOptions } from './types'

const getUserSSR = async <TUser extends Partial<User> & JWTContent>({
  accessKeyName = ACCESS_KEY_NAME,
}: GetUserOptions = {}) => {
  const token = await getTokenSSR(accessKeyName)
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

export default getUserSSR
