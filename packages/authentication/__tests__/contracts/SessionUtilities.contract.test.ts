/**
 * Contract tests for SessionService and SessionContract.
 *
 * Source contracts:
 *   - SessionService { read, write, clear, getState, refresh, handleUnauthorized }
 *   - SessionContract { isAuthenticated, resolveUser }
 */
import {
  AUTH_SESSION_CLEARED,
  AUTH_SESSION_REFRESHED,
} from '@baseapp-frontend/utils/constants/events'
import {
  ACCESS_KEY_NAME,
  REFRESH_KEY_NAME,
  SESSION_TOKEN_KEY_NAME,
} from '@baseapp-frontend/utils/constants/jwt'
import { CURRENT_PROFILE_KEY_NAME } from '@baseapp-frontend/utils/constants/profile'
import { eventEmitter } from '@baseapp-frontend/utils/functions/events'
import { decodeJWT } from '@baseapp-frontend/utils/functions/token/decodeJWT'
import { getToken } from '@baseapp-frontend/utils/functions/token/getToken'
import { getTokens } from '@baseapp-frontend/utils/functions/token/getTokens'
import { isUserTokenValid } from '@baseapp-frontend/utils/functions/token/isUserTokenValid'
import { removeTokenAsync } from '@baseapp-frontend/utils/functions/token/removeTokenAsync'
import { setTokenAsync } from '@baseapp-frontend/utils/functions/token/setTokenAsync'

import { getActiveAuthModule } from '../../modules/auth-strategy/factory'
import type { SessionMaterial, SessionService } from '../../modules/auth-strategy/types'
import { createSessionService } from '../../session/service'
import { createBrowserSessionStorage } from '../../session/storage'

jest.mock('@baseapp-frontend/utils/functions/token/getToken')
jest.mock('@baseapp-frontend/utils/functions/token/setTokenAsync')
jest.mock('@baseapp-frontend/utils/functions/token/removeTokenAsync')
jest.mock('@baseapp-frontend/utils/functions/token/getTokens')
jest.mock('@baseapp-frontend/utils/functions/token/decodeJWT')
jest.mock('@baseapp-frontend/utils/functions/token/isUserTokenValid')
jest.mock('@baseapp-frontend/utils/functions/events', () => ({
  eventEmitter: {
    emit: jest.fn(),
    on: jest.fn(),
    removeListener: jest.fn(),
  },
}))

const mockedGetToken = jest.mocked(getToken)
const mockedDecodeJWT = jest.mocked(decodeJWT)
const mockedIsUserTokenValid = jest.mocked(isUserTokenValid)
const mockedSetTokenAsync = jest.mocked(setTokenAsync)
const mockedRemoveTokenAsync = jest.mocked(removeTokenAsync)
const mockedGetTokens = jest.mocked(getTokens)
const mockedEventEmitter = jest.mocked(eventEmitter)

describe('SessionService — contract', () => {
  let sessionService: SessionService

  beforeEach(() => {
    jest.resetAllMocks()
    mockedGetToken.mockReturnValue(undefined)
    mockedSetTokenAsync.mockResolvedValue(undefined)
    mockedRemoveTokenAsync.mockResolvedValue(undefined)

    sessionService = createSessionService(
      getActiveAuthModule('allauth').session,
      createBrowserSessionStorage(),
    )
  })

  it('getState delegates to the active strategy session', async () => {
    const state = await sessionService.getState()

    expect(state).toBeDefined()
    expect(['authenticated', 'anonymous', 'expired']).toContain(state.status)
  })

  it('read reads token values from cookie storage', () => {
    mockedGetToken.mockImplementation((key) => {
      if (key === ACCESS_KEY_NAME) return 'stored-access'
      if (key === REFRESH_KEY_NAME) return 'stored-refresh'
      if (key === SESSION_TOKEN_KEY_NAME) return 'stored-session'
      return undefined
    })

    const session = sessionService.read() as SessionMaterial

    expect(session.accessToken).toBe('stored-access')
    expect(session.refreshToken).toBe('stored-refresh')
    expect(session.sessionToken).toBe('stored-session')
  })

  it('write persists tokens to cookie storage', async () => {
    const session: SessionMaterial = {
      accessToken: 'new-access',
      refreshToken: 'new-refresh',
      sessionToken: 'new-session',
    }

    await sessionService.write(session)

    expect(mockedSetTokenAsync).toHaveBeenCalledWith(
      ACCESS_KEY_NAME,
      'new-access',
      expect.objectContaining({ secure: expect.any(Boolean) }),
    )
    expect(mockedSetTokenAsync).toHaveBeenCalledWith(
      REFRESH_KEY_NAME,
      'new-refresh',
      expect.objectContaining({ secure: expect.any(Boolean) }),
    )
    expect(mockedSetTokenAsync).toHaveBeenCalledWith(
      SESSION_TOKEN_KEY_NAME,
      'new-session',
      expect.objectContaining({ secure: expect.any(Boolean) }),
    )
  })

  it('clear removes all token cookies and profile cookie', async () => {
    await sessionService.clear('logout')

    expect(mockedRemoveTokenAsync).toHaveBeenCalledWith(ACCESS_KEY_NAME)
    expect(mockedRemoveTokenAsync).toHaveBeenCalledWith(REFRESH_KEY_NAME)
    expect(mockedRemoveTokenAsync).toHaveBeenCalledWith(SESSION_TOKEN_KEY_NAME)
    expect(mockedRemoveTokenAsync).toHaveBeenCalledWith(CURRENT_PROFILE_KEY_NAME)
    expect(mockedEventEmitter.emit).toHaveBeenCalledWith(AUTH_SESSION_CLEARED, {
      type: AUTH_SESSION_CLEARED,
      reason: 'logout',
    })
  })

  it('refresh persists refreshed tokens and emits AUTH_SESSION_REFRESHED on success', async () => {
    mockedGetToken.mockImplementation((key) => {
      if (key === ACCESS_KEY_NAME) return 'expired-access'
      if (key === REFRESH_KEY_NAME) return 'valid-refresh'
      return undefined
    })
    mockedGetTokens.mockResolvedValue({ access: 'refreshed-access', refresh: 'refreshed-refresh' })
    mockedDecodeJWT.mockReturnValue({ exp: Math.floor(Date.now() / 1000) + 3600 } as never)

    const state = await sessionService.refresh()

    expect(state.status).toBe('authenticated')
    expect(mockedSetTokenAsync).toHaveBeenCalledWith(
      ACCESS_KEY_NAME,
      'refreshed-access',
      expect.any(Object),
    )
    expect(mockedEventEmitter.emit).toHaveBeenCalledWith(AUTH_SESSION_REFRESHED, {
      type: AUTH_SESSION_REFRESHED,
    })
  })

  it('refresh clears all cookies and emits AUTH_SESSION_CLEARED on failure', async () => {
    mockedGetToken.mockImplementation((key) => {
      if (key === ACCESS_KEY_NAME) return 'expired-access'
      if (key === REFRESH_KEY_NAME) return 'bad-refresh'
      return undefined
    })
    mockedGetTokens.mockRejectedValue(new Error('refresh failed'))

    const state = await sessionService.refresh()

    expect(state.status).toBe('anonymous')
    expect(mockedRemoveTokenAsync).toHaveBeenCalledWith(ACCESS_KEY_NAME)
    expect(mockedEventEmitter.emit).toHaveBeenCalledWith(AUTH_SESSION_CLEARED, {
      type: AUTH_SESSION_CLEARED,
      reason: 'refresh_failed',
    })
  })

  it('handleUnauthorized delegates to refresh()', async () => {
    mockedGetToken.mockImplementation((key) => {
      if (key === REFRESH_KEY_NAME) return 'valid-refresh'
      return undefined
    })
    mockedGetTokens.mockResolvedValue({ access: 'refreshed-access', refresh: 'refreshed-refresh' })
    mockedDecodeJWT.mockReturnValue({ exp: Math.floor(Date.now() / 1000) + 3600 } as never)

    const state = await sessionService.handleUnauthorized()

    expect(state.status).toBe('authenticated')
  })

  it('isAuthenticated returns true when access token exists and is valid', async () => {
    mockedGetToken.mockImplementation((key) => {
      if (key === ACCESS_KEY_NAME) return 'valid-access'
      return undefined
    })
    mockedDecodeJWT.mockReturnValue({ exp: Math.floor(Date.now() / 1000) + 3600 } as never)
    mockedIsUserTokenValid.mockReturnValue(true)

    const authenticated = await sessionService.isAuthenticated()

    expect(authenticated).toBe(true)
  })

  it('resolveUser returns null when no session exists', async () => {
    const user = await sessionService.resolveUser()

    expect(user).toBeNull()
  })
})
