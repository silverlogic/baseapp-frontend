/**
 * Contract tests for the unauthorized event flow.
 *
 * Source contracts:
 *   - AuthUnauthorizedEvent { type, source, path, status, hasRefreshToken, requestId }
 *   - AuthSessionRefreshedEvent { type }
 *   - AuthSessionClearedEvent { type, reason }
 *   - SessionService emits AUTH_SESSION_REFRESHED / AUTH_SESSION_CLEARED
 */
import {
  AUTH_SESSION_CLEARED,
  AUTH_SESSION_REFRESHED,
  AUTH_UNAUTHORIZED_EVENT,
} from '@baseapp-frontend/utils/constants/events'

import type {
  AuthSessionClearedEvent,
  AuthSessionRefreshedEvent,
  AuthUnauthorizedEvent,
} from '../../modules/auth-strategy/types'

describe('Unauthorized event flow — contract', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('event shape', () => {
    it('AUTH_UNAUTHORIZED event has the required fields', () => {
      const event: AuthUnauthorizedEvent = {
        type: 'AUTH_UNAUTHORIZED',
        source: 'fetch',
        status: 401,
        hasRefreshToken: true,
        path: '/api/some-resource',
      }

      expect(event.type).toBe('AUTH_UNAUTHORIZED')
      expect(event.source).toBe('fetch')
      expect(event.status).toBe(401)
      expect(event.hasRefreshToken).toBe(true)
    })

    it('AUTH_SESSION_REFRESHED event has the required type', () => {
      const event: AuthSessionRefreshedEvent = {
        type: 'AUTH_SESSION_REFRESHED',
      }

      expect(event.type).toBe('AUTH_SESSION_REFRESHED')
    })

    it('AUTH_SESSION_CLEARED event has the required fields', () => {
      const event: AuthSessionClearedEvent = {
        type: 'AUTH_SESSION_CLEARED',
        reason: 'refresh_failed',
      }

      expect(event.type).toBe('AUTH_SESSION_CLEARED')
      expect(['refresh_failed', 'logout', 'missing_refresh_token']).toContain(event.reason)
    })
  })

  describe('event constants', () => {
    it('exports the canonical auth session event names', () => {
      expect(AUTH_UNAUTHORIZED_EVENT).toBe('AUTH_UNAUTHORIZED')
      expect(AUTH_SESSION_REFRESHED).toBe('AUTH_SESSION_REFRESHED')
      expect(AUTH_SESSION_CLEARED).toBe('AUTH_SESSION_CLEARED')
    })
  })
})
