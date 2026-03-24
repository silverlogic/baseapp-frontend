import {
  ACCESS_KEY_NAME,
  REFRESH_KEY_NAME,
  SESSION_TOKEN_KEY_NAME,
} from '@baseapp-frontend/utils/constants/jwt'
import { getTokenSSR } from '@baseapp-frontend/utils/functions/token/getTokenSSR'

import { SESSION_STATUS } from '../modules/auth-strategy/constants'
import { getActiveAuthModule } from '../modules/auth-strategy/factory'
import type { SessionContract, SessionMaterial, SessionState } from '../modules/auth-strategy/types'
import type { User } from '../types/user'

function readRequestSession(request: {
  cookies: { get(name: string): { value: string } | undefined }
}): SessionMaterial {
  return {
    accessToken: request.cookies.get(ACCESS_KEY_NAME)?.value ?? null,
    refreshToken: request.cookies.get(REFRESH_KEY_NAME)?.value ?? null,
    sessionToken: request.cookies.get(SESSION_TOKEN_KEY_NAME)?.value ?? null,
  }
}

async function readServerSession(): Promise<SessionMaterial> {
  return {
    accessToken: (await getTokenSSR(ACCESS_KEY_NAME)) ?? null,
    refreshToken: (await getTokenSSR(REFRESH_KEY_NAME)) ?? null,
    sessionToken: (await getTokenSSR(SESSION_TOKEN_KEY_NAME)) ?? null,
  }
}

async function evaluateState<TUser = User>(session: SessionMaterial): Promise<SessionState<TUser>> {
  const { session: strategySession } = getActiveAuthModule()
  return (await strategySession.evaluate(session)) as SessionState<TUser>
}

async function resolveRequestState<TUser = User>(
  session: SessionMaterial,
): Promise<SessionState<TUser>> {
  const { session: strategySession } = getActiveAuthModule()
  const state = (await strategySession.evaluate(session)) as SessionState<TUser>

  if (state.status === SESSION_STATUS.expired && session.refreshToken) {
    return (await strategySession.refresh(session)) as SessionState<TUser>
  }

  return state
}

export async function getServerSessionState<TUser = User>(): Promise<SessionState<TUser>> {
  return evaluateState<TUser>(await readServerSession())
}

export async function getServerSessionContract<TUser = User>(): Promise<SessionContract<TUser>> {
  const session = await readServerSession()
  let statePromise: Promise<SessionState<TUser>> | null = null

  const getResolvedState = () => {
    if (!statePromise) {
      statePromise = evaluateState<TUser>(session)
    }

    return statePromise
  }

  return {
    async isAuthenticated() {
      const state = await getResolvedState()
      return state.status === SESSION_STATUS.authenticated
    },
    async resolveUser() {
      const state = await getResolvedState()
      return state.user
    },
  }
}

export async function evaluateRequestSession<TUser = User>(request: {
  cookies: { get(name: string): { value: string } | undefined }
}): Promise<SessionState<TUser>> {
  return resolveRequestState<TUser>(readRequestSession(request))
}
