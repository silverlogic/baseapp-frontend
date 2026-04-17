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

const SESSION_COOKIE_NAMES = [ACCESS_KEY_NAME, REFRESH_KEY_NAME, SESSION_TOKEN_KEY_NAME] as const
const SESSION_COOKIE_CONFIG = { secure: process.env.NODE_ENV === 'production' }

type MiddlewareResponse = {
  cookies: {
    set(name: string, value: string, options?: object): void
    delete(name: string): void
  }
}

function readCookieHeader(headers: Headers): Map<string, string> {
  const cookieHeader = headers.get('cookie')
  const cookies = new Map<string, string>()
  if (!cookieHeader) return cookies
  cookieHeader.split(';').forEach((entry) => {
    const [rawName, ...rawValueParts] = entry.trim().split('=')
    if (!rawName) return
    cookies.set(rawName, rawValueParts.join('='))
  })
  return cookies
}

function writeCookieHeader(headers: Headers, cookies: Map<string, string>) {
  const nextCookieHeader = Array.from(cookies.entries())
    .map(([name, value]) => `${name}=${value}`)
    .join('; ')
  if (nextCookieHeader) {
    headers.set('cookie', nextCookieHeader)
    return
  }
  headers.delete('cookie')
}

export function setRequestCookie(headers: Headers, name: string, value: string) {
  const cookies = readCookieHeader(headers)
  cookies.set(name, value)
  writeCookieHeader(headers, cookies)
}

function deleteRequestCookie(headers: Headers, name: string) {
  const cookies = readCookieHeader(headers)
  cookies.delete(name)
  writeCookieHeader(headers, cookies)
}

export function applySessionCookies(
  response: MiddlewareResponse,
  headers: Headers,
  session: SessionMaterial,
): void {
  const tokens: [string, string | null][] = [
    [ACCESS_KEY_NAME, session.accessToken],
    [REFRESH_KEY_NAME, session.refreshToken],
    [SESSION_TOKEN_KEY_NAME, session.sessionToken],
  ]
  tokens
    .filter(([, value]) => Boolean(value))
    .forEach(([name, value]) => {
      response.cookies.set(name, value as string, SESSION_COOKIE_CONFIG)
      setRequestCookie(headers, name, value as string)
    })
}

export function clearSessionCookies(response: MiddlewareResponse, headers: Headers): void {
  SESSION_COOKIE_NAMES.forEach((name) => {
    response.cookies.delete(name)
    deleteRequestCookie(headers, name)
  })
}

// Expired session: only remove the access token — refresh token is preserved
// so the next request can attempt a token refresh.
export function clearExpiredSessionCookies(response: MiddlewareResponse, headers: Headers): void {
  response.cookies.delete(ACCESS_KEY_NAME)
  deleteRequestCookie(headers, ACCESS_KEY_NAME)
}

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

export async function getServerSession<TUser = User>(): Promise<SessionState<TUser>> {
  return evaluateState<TUser>(await readServerSession())
}

export async function getServerSessionState<TUser = User>(): Promise<SessionState<TUser>> {
  return getServerSession<TUser>()
}

export async function getServerSessionContract<TUser = User>(): Promise<SessionContract<TUser>> {
  const session = await readServerSession()
  let statePromise: Promise<SessionState<TUser>> | null = null

  const getResolvedState = () => {
    statePromise ??= evaluateState<TUser>(session)

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
