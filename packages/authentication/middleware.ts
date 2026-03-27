export { preAuthenticateWithActiveStrategy } from './modules/auth-strategy/preAuthenticate'
export {
  evaluateRequestSession,
  applySessionCookies,
  clearSessionCookies,
  clearExpiredSessionCookies,
  setRequestCookie,
} from './session/server'
export { SESSION_STATUS } from './modules/auth-strategy/constants'

export type { SessionMaterial, SessionState, SessionStatus } from './modules/auth-strategy/types'
