import { decodeJWT } from '@baseapp-frontend/utils/functions/token/decodeJWT'
import { getTokens } from '@baseapp-frontend/utils/functions/token/getTokens'
import { isUserTokenValid } from '@baseapp-frontend/utils/functions/token/isUserTokenValid'

import { createAllauthSession } from '../../modules/auth-strategy/allauth'

jest.mock('@baseapp-frontend/utils/functions/token/getTokens')
jest.mock('@baseapp-frontend/utils/functions/token/decodeJWT')
jest.mock('@baseapp-frontend/utils/functions/token/isUserTokenValid')

const mockedGetTokens = jest.mocked(getTokens)
const mockedDecodeJWT = jest.mocked(decodeJWT)
const mockedIsUserTokenValid = jest.mocked(isUserTokenValid)

describe('createAllauthSession', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('treats missing access token with refresh token as expired', async () => {
    const session = createAllauthSession()

    const state = await session.evaluate({
      accessToken: null,
      refreshToken: 'refresh-token',
    })

    expect(state.status).toBe('expired')
  })

  it('refreshes to authenticated when refresh succeeds', async () => {
    const session = createAllauthSession()
    mockedGetTokens.mockResolvedValue({ access: 'new-access', refresh: 'new-refresh' })
    mockedDecodeJWT.mockReturnValue({ exp: Math.floor(Date.now() / 1000) + 3600 } as never)

    const state = await session.refresh({
      refreshToken: 'refresh-token',
      sessionToken: 'session-token',
    })

    expect(state.status).toBe('authenticated')
    expect(state.session.accessToken).toBe('new-access')
    expect(state.session.refreshToken).toBe('new-refresh')
  })

  it('returns anonymous when refresh fails', async () => {
    const session = createAllauthSession()
    mockedGetTokens.mockRejectedValue(new Error('refresh failed'))

    const state = await session.refresh({
      refreshToken: 'refresh-token',
    })

    expect(state.status).toBe('anonymous')
  })

  it('marks access token as authenticated when valid', async () => {
    const session = createAllauthSession()
    mockedDecodeJWT.mockReturnValue({ exp: Math.floor(Date.now() / 1000) + 3600 } as never)
    mockedIsUserTokenValid.mockReturnValue(true)

    const state = await session.evaluate({
      accessToken: 'valid-access',
    })

    expect(state.status).toBe('authenticated')
  })

  it('keeps the decoded user when access token is expired', async () => {
    const session = createAllauthSession()
    mockedDecodeJWT.mockReturnValue({
      id: 1,
      email: 'user@company.com',
      exp: Math.floor(Date.now() / 1000) - 60,
    } as never)
    mockedIsUserTokenValid.mockReturnValue(false)

    const state = await session.evaluate({
      accessToken: 'expired-access',
      refreshToken: 'refresh-token',
    })

    expect(state.status).toBe('expired')
    expect(state.user?.email).toBe('user@company.com')
  })
})
