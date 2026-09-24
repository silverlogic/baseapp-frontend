import { isUserTokenValid } from '..'

vi.mock('server-only', async () => ({}))

describe('isUserTokenValid function', () => {
  const mockCurrentTime = 1000000

  beforeAll(() => {
    vi.spyOn(Date, 'now').mockReturnValue(mockCurrentTime * 1000)
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  it('returns true for a valid token', () => {
    const validUserToken = {
      tokenType: 'access',
      exp: mockCurrentTime + 1,
      iat: 123,
      jti: `jti`,
    } as const

    expect(isUserTokenValid(validUserToken)).toBe(true)
  })

  it('returns false for an expired token', () => {
    const expiredUserToken = {
      tokenType: 'access',
      exp: mockCurrentTime - 1,
      iat: 123,
      jti: `jti`,
    } as const

    expect(isUserTokenValid(expiredUserToken)).toBe(false)
  })
})
