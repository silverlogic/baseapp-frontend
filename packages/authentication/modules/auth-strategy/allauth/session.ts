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
      user: null,
    },
  }
}

function decodeAccessToken(accessToken?: string | null): AccessTokenPayload | null {
  if (!accessToken) return null
  return decodeJWT<AccessTokenPayload>(accessToken)
}

async function evaluate(session: SessionMaterial): Promise<SessionState> {
  if (!session.accessToken) {
    if (session.refreshToken) {
      return {
        status: SESSION_STATUS.expired,
        user: session.user ?? null,
        session,
      }
    }

    return toAnonymousState()
  }

  // The access token is used only to determine session validity (its `exp`).
  // User identity comes from the persisted session material, not the token,
  // because allauth issues a clean token and returns the user in the response.
  const payload = decodeAccessToken(session.accessToken)
  const valid = isUserTokenValid(payload)

  return {
    status: valid ? SESSION_STATUS.authenticated : SESSION_STATUS.expired,
    user: session.user ?? null,
    session,
  }
}

async function doRefresh(session: SessionMaterial): Promise<SessionState> {
  if (!session.refreshToken) {
    return toAnonymousState()
  }

  try {
    const tokens = await getTokens(session.refreshToken)
    // Refresh only rotates tokens; identity is preserved from the existing
    // session material (the refresh endpoint returns no user).
    const nextSession: SessionMaterial = {
      accessToken: tokens.access,
      refreshToken: tokens.refresh ?? session.refreshToken,
      sessionToken: session.sessionToken ?? null,
      user: session.user ?? null,
    }

    return {
      status: SESSION_STATUS.authenticated,
      user: nextSession.user ?? null,
      session: nextSession,
    }
  } catch {
    return toAnonymousState()
  }
}

async function refresh(session: SessionMaterial): Promise<SessionState> {
  const { refreshToken } = session

  if (!refreshToken) {
    return toAnonymousState()
  }

  const inflightRefresh = inflightRefreshByToken.get(refreshToken)

  if (inflightRefresh !== undefined) {
    return inflightRefresh
  }

  const nextRefresh = doRefresh(session).finally(() => {
    inflightRefreshByToken.delete(refreshToken)
  })

  inflightRefreshByToken.set(refreshToken, nextRefresh)

  return nextRefresh
}

export function createAllauthSession(): StrategySession {
  return {
    evaluate,
    refresh,
  }
}
