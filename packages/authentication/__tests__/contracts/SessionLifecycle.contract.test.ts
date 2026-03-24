/**
 * Contract tests for provider-owned strategy sessions.
 *
 * Source contracts:
 *   - StrategySession.evaluate(session)
 *   - StrategySession.refresh(session)
 *   - Refresh remains single-flight inside the provider session module
 */
import { decodeJWT } from '@baseapp-frontend/utils/functions/token/decodeJWT'
import { getTokens } from '@baseapp-frontend/utils/functions/token/getTokens'
import { isUserTokenValid } from '@baseapp-frontend/utils/functions/token/isUserTokenValid'

import { createAllauthSession } from '../../modules/auth-strategy/allauth'
import type {
  SessionMaterial,
  SessionState,
  StrategySession,
} from '../../modules/auth-strategy/types'

jest.mock('@baseapp-frontend/utils/functions/token/getTokens')
jest.mock('@baseapp-frontend/utils/functions/token/decodeJWT')
jest.mock('@baseapp-frontend/utils/functions/token/isUserTokenValid')

const mockedGetTokens = jest.mocked(getTokens)
const mockedDecodeJWT = jest.mocked(decodeJWT)
const mockedIsUserTokenValid = jest.mocked(isUserTokenValid)

describe('StrategySession — allauth — contract', () => {
  let strategySession: StrategySession

  beforeEach(() => {
    strategySession = createAllauthSession()
    jest.resetAllMocks()
  })

  it('evaluate returns authenticated for valid session material', async () => {
    mockedDecodeJWT.mockReturnValue({ exp: Math.floor(Date.now() / 1000) + 3600 } as never)
    mockedIsUserTokenValid.mockReturnValue(true)

    const session: SessionMaterial = {
      accessToken: 'valid-access-token',
      refreshToken: 'valid-refresh-token',
    }

    const state: SessionState = await strategySession.evaluate(session)

    expect(state.status).toBe('authenticated')
    expect(state.user).toBeDefined()
  })

  it('evaluate returns expired when access is missing but refresh exists', async () => {
    const session: SessionMaterial = {
      accessToken: null,
      refreshToken: 'valid-refresh-token',
    }

    const state: SessionState = await strategySession.evaluate(session)

    expect(state.status).toBe('expired')
    expect(state.user).toBeNull()
  })

  it('evaluate returns anonymous when no tokens exist', async () => {
    const state = await strategySession.evaluate({})

    expect(state.status).toBe('anonymous')
  })

  it('refresh returns authenticated with fresh tokens on success', async () => {
    mockedGetTokens.mockResolvedValue({ access: 'fresh-access', refresh: 'fresh-refresh' })
    mockedDecodeJWT.mockReturnValue({ exp: Math.floor(Date.now() / 1000) + 3600 } as never)

    const state: SessionState = await strategySession.refresh({
      accessToken: 'expired-access-token',
      refreshToken: 'valid-refresh-token',
      sessionToken: 'session-tok',
    })

    expect(state.status).toBe('authenticated')
    expect(state.session.accessToken).toBe('fresh-access')
    expect(state.session.refreshToken).toBe('fresh-refresh')
    expect(state.session.sessionToken).toBe('session-tok')
  })

  it('refresh returns anonymous on refresh failure', async () => {
    mockedGetTokens.mockRejectedValue(new Error('refresh failed'))

    const state = await strategySession.refresh({
      accessToken: 'expired-access-token',
      refreshToken: 'bad-refresh-token',
    })

    expect(state.status).toBe('anonymous')
    expect(state.session.accessToken).toBeNull()
    expect(state.session.refreshToken).toBeNull()
  })

  it('refresh is single-flight under concurrent unauthorized events', async () => {
    let callCount = 0
    mockedGetTokens.mockImplementation(async () => {
      callCount++
      await new Promise((resolve) => setTimeout(resolve, 50))
      return { access: 'single-flight-access', refresh: 'single-flight-refresh' }
    })
    mockedDecodeJWT.mockReturnValue({ exp: Math.floor(Date.now() / 1000) + 3600 } as never)

    const session: SessionMaterial = {
      accessToken: 'expired-access-token',
      refreshToken: 'valid-refresh-token',
    }

    const results = await Promise.all([
      strategySession.refresh(session),
      strategySession.refresh(session),
      strategySession.refresh(session),
    ])

    expect(callCount).toBe(1)
    const uniqueAccessTokens = new Set(results.map((result) => result.session.accessToken))
    expect(uniqueAccessTokens.size).toBe(1)
  })

  it('refresh returns anonymous when no refresh token exists', async () => {
    const state = await strategySession.refresh({
      accessToken: 'expired-access-token',
      refreshToken: null,
    })

    expect(state.status).toBe('anonymous')
    expect(mockedGetTokens).not.toHaveBeenCalled()
  })
})
