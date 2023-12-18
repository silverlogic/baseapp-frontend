import { isUserTokenValid } from '..'

jest.mock('server-only', () => ({}))

describe('isUserTokenValid function', () => {
  const mockCurrentTime = 1000000

  beforeAll(() => {
    jest.spyOn(Date, 'now').mockReturnValue(mockCurrentTime * 1000)
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('returns true for a valid token', () => {
    const validUserToken = {
      token_type: 'access',
      exp: mockCurrentTime + 1,
      iat: 123,
      jti: `jti`,
    } as const

    expect(isUserTokenValid(validUserToken)).toBe(true)
  })

  it('returns false for an expired token', () => {
    const expiredUserToken = {
      token_type: 'access',
      exp: mockCurrentTime - 1,
      iat: 123,
      jti: `jti`,
    } as const

    expect(isUserTokenValid(expiredUserToken)).toBe(false)
  })
})
