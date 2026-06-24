import { getActiveAuthModule } from '../modules/auth-strategy/factory'
import type { SessionService, SessionState } from '../modules/auth-strategy/types'
import type { User } from '../types/user'
import { createSessionService } from './service'
import { createBrowserSessionStorage } from './storage'

let cachedSessionService: SessionService<User> | null = null

export function getSessionService<TUser = User>(): SessionService<TUser> {
  if (!cachedSessionService) {
    cachedSessionService = createSessionService(
      getActiveAuthModule().session,
      createBrowserSessionStorage(),
    )
  }

  return cachedSessionService as SessionService<TUser>
}

export async function refreshClientSession<TUser = User>(): Promise<SessionState<TUser>> {
  return getSessionService<TUser>().refresh()
}

export async function handleClientUnauthorized<TUser = User>(): Promise<SessionState<TUser>> {
  return getSessionService<TUser>().handleUnauthorized()
}
