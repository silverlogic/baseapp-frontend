import {
  AUTH_SESSION_CLEARED,
  AUTH_SESSION_REFRESHED,
} from '@baseapp-frontend/utils/constants/events'
import { eventEmitter } from '@baseapp-frontend/utils/functions/events'

import { SESSION_STATUS } from '../modules/auth-strategy/constants'
import type {
  AuthSessionClearedEvent,
  SessionService,
  SessionState,
  StrategySession,
} from '../modules/auth-strategy/types'
import type { User } from '../types/user'
import type { SessionStorageAdapter } from './storage'

function emitRefreshed() {
  eventEmitter.emit(AUTH_SESSION_REFRESHED, {
    type: AUTH_SESSION_REFRESHED,
  })
}

function emitCleared(reason: AuthSessionClearedEvent['reason']) {
  eventEmitter.emit(AUTH_SESSION_CLEARED, {
    type: AUTH_SESSION_CLEARED,
    reason,
  })
}

export function createSessionService<TUser = User>(
  strategySession: StrategySession<TUser>,
  storage: SessionStorageAdapter,
): SessionService<TUser> {
  async function clear(reason?: AuthSessionClearedEvent['reason']): Promise<void> {
    await storage.clear()

    if (reason) {
      emitCleared(reason)
    }
  }

  async function getState(): Promise<SessionState<TUser>> {
    return strategySession.evaluate(storage.read())
  }

  async function refresh(): Promise<SessionState<TUser>> {
    const currentSession = storage.read()

    if (!currentSession.refreshToken) {
      await clear('missing_refresh_token')
      return strategySession.evaluate(currentSession)
    }

    try {
      const state = await strategySession.refresh(currentSession)

      if (state.status === SESSION_STATUS.authenticated) {
        await storage.write(state.session)
        emitRefreshed()
        return state
      }

      await clear('refresh_failed')
      return state
    } catch {
      await clear('refresh_failed')
      return strategySession.evaluate(currentSession)
    }
  }

  async function handleUnauthorized(): Promise<SessionState<TUser>> {
    return refresh()
  }

  async function isAuthenticated(): Promise<boolean> {
    const state = await getState()
    return state.status === SESSION_STATUS.authenticated
  }

  async function resolveUser(): Promise<TUser | null> {
    const state = await getState()
    return state.user
  }

  return {
    read: storage.read,
    write: storage.write,
    clear,
    getState,
    refresh,
    handleUnauthorized,
    isAuthenticated,
    resolveUser,
  }
}
