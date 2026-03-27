import { decodeJWT } from '@baseapp-frontend/utils/functions/token/decodeJWT'
import { getTokens } from '@baseapp-frontend/utils/functions/token/getTokens'
import { isUserTokenValid } from '@baseapp-frontend/utils/functions/token/isUserTokenValid'
import type { JWTContent } from '@baseapp-frontend/utils/types/jwt'

import type { User } from '../../../types/user'
import { SESSION_STATUS } from '../constants'
import type { SessionMaterial, SessionState, StrategySession } from '../types'

type AccessTokenPayload = JWTContent & Partial<User>

const inflightRefreshByToken = new Map<string, Promise<SessionState>>()

function toAnonymousState(): SessionState {
  return {
    status: SESSION_STATUS.anonymous,
    user: null,
    session: {
      accessToken: null,
      refreshToken: null,
      sessionToken: null,
    },
  }
}

function decodeAccessToken(accessToken?: string | null): AccessTokenPayload | null {
  if (!accessToken) return null
  return decodeJWT<AccessTokenPayload>(accessToken)
}

function toAuthenticatedState(
  payload: AccessTokenPayload | null,
  session: SessionMaterial,
): SessionState {
  return {
    status: SESSION_STATUS.authenticated,
    user: (payload as User) ?? null,
    session,
  }
}

export function createAllauthSession(): StrategySession {
  async function evaluate(session: SessionMaterial): Promise<SessionState> {
    if (!session.accessToken) {
      if (session.refreshToken) {
        return {
          status: SESSION_STATUS.expired,
          user: null,
          session,
        }
      }

      return toAnonymousState()
    }

    const payload = decodeAccessToken(session.accessToken)
    const valid = isUserTokenValid(payload)

    return {
      status: valid ? SESSION_STATUS.authenticated : SESSION_STATUS.expired,
      user: (payload as User) ?? null,
      session,
    }
  }

  async function doRefresh(session: SessionMaterial): Promise<SessionState> {
    if (!session.refreshToken) {
      return toAnonymousState()
    }

    try {
      const tokens = await getTokens(session.refreshToken)
      const nextSession: SessionMaterial = {
        accessToken: tokens.access,
        refreshToken: tokens.refresh ?? session.refreshToken,
        sessionToken: session.sessionToken ?? null,
      }
      const payload = decodeAccessToken(tokens.access)

      return toAuthenticatedState(payload, nextSession)
    } catch {
      return toAnonymousState()
    }
  }

  async function refresh(session: SessionMaterial): Promise<SessionState> {
    const { refreshToken } = session

    if (!refreshToken) {
      return doRefresh(session)
    }

    const inflightRefresh = inflightRefreshByToken.get(refreshToken)

    if (inflightRefresh) {
      return inflightRefresh
    }

    const nextRefresh = doRefresh(session).finally(() => {
      inflightRefreshByToken.delete(refreshToken)
    })

    inflightRefreshByToken.set(refreshToken, nextRefresh)

    return nextRefresh
  }

  return {
    evaluate,
    refresh,
  }
}
