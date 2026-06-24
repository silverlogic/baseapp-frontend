import {
  ACCESS_KEY_NAME,
  CURRENT_USER_KEY_NAME,
  REFRESH_KEY_NAME,
  SESSION_TOKEN_KEY_NAME,
} from '@baseapp-frontend/utils/constants/jwt'
import { CURRENT_PROFILE_KEY_NAME } from '@baseapp-frontend/utils/constants/profile'
import { getToken } from '@baseapp-frontend/utils/functions/token/getToken'
import { removeTokenAsync } from '@baseapp-frontend/utils/functions/token/removeTokenAsync'
import { setTokenAsync } from '@baseapp-frontend/utils/functions/token/setTokenAsync'

import type { SessionMaterial } from '../modules/auth-strategy/types'
import { parseUserCookie, serializeUserCookie } from './user-cookie'

export interface SessionStorageAdapter {
  read(): SessionMaterial
  write(session: SessionMaterial): Promise<void>
  clear(): Promise<void>
}

export function createBrowserSessionStorage(): SessionStorageAdapter {
  const cookieConfig = { secure: process.env.NODE_ENV === 'production' }

  return {
    read() {
      return {
        accessToken: getToken(ACCESS_KEY_NAME) ?? null,
        refreshToken: getToken(REFRESH_KEY_NAME) ?? null,
        sessionToken: getToken(SESSION_TOKEN_KEY_NAME) ?? null,
        user: parseUserCookie(getToken(CURRENT_USER_KEY_NAME)),
      }
    },

    async write(session) {
      if (session.accessToken) {
        await setTokenAsync(ACCESS_KEY_NAME, session.accessToken, cookieConfig)
      }
      if (session.refreshToken) {
        await setTokenAsync(REFRESH_KEY_NAME, session.refreshToken, cookieConfig)
      }
      if (session.sessionToken) {
        await setTokenAsync(SESSION_TOKEN_KEY_NAME, session.sessionToken, cookieConfig)
      }
      if (session.user) {
        await setTokenAsync(CURRENT_USER_KEY_NAME, serializeUserCookie(session.user), cookieConfig)
      } else {
        // Keep the user cookie in sync with the written session: a session with
        // no user (e.g. MFA completion before hydration) must clear any
        // previously stored user, otherwise a stale or other-account identity
        // survives the write.
        await removeTokenAsync(CURRENT_USER_KEY_NAME)
      }
    },

    async clear() {
      await removeTokenAsync(ACCESS_KEY_NAME)
      await removeTokenAsync(REFRESH_KEY_NAME)
      await removeTokenAsync(SESSION_TOKEN_KEY_NAME)
      await removeTokenAsync(CURRENT_USER_KEY_NAME)
      await removeTokenAsync(CURRENT_PROFILE_KEY_NAME)
    },
  }
}
