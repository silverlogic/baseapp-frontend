import { getSessionIdentity } from '..'

// Unsigned JWTs are enough: the identity is read from the payload, never verified.
const jwt = (payload: Record<string, unknown>) =>
  ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9', btoa(JSON.stringify(payload)), 'signature'].join('.')

describe('getSessionIdentity', () => {
  it('returns anonymous without an access token', () => {
    expect(getSessionIdentity()).toBe('anonymous')
    expect(getSessionIdentity('', jwt({ jti: 'login-1' }))).toBe('anonymous')
  })

  it('returns anonymous when the access token cannot be decoded', () => {
    expect(getSessionIdentity('not-a-jwt')).toBe('anonymous')
  })

  it('returns anonymous when the access token names no principal', () => {
    expect(getSessionIdentity(jwt({ jti: 'access-1' }), jwt({ jti: 'login-1' }))).toBe('anonymous')
  })

  it('combines the principal with the refresh token jti', () => {
    expect(getSessionIdentity(jwt({ id: 7 }), jwt({ jti: 'login-1' }))).toBe('7:login-1')
  })

  it('prefers id, then user_id, then sub as the principal', () => {
    const refresh = jwt({ jti: 'login-1' })
    expect(getSessionIdentity(jwt({ id: 1, user_id: 2, sub: '3' }), refresh)).toBe('1:login-1')
    expect(getSessionIdentity(jwt({ user_id: 2, sub: '3' }), refresh)).toBe('2:login-1')
    expect(getSessionIdentity(jwt({ sub: '3' }), refresh)).toBe('3:login-1')
  })

  it('marks a session without a usable refresh token as access-only', () => {
    expect(getSessionIdentity(jwt({ id: 7 }))).toBe('7:access-only')
    expect(getSessionIdentity(jwt({ id: 7 }), 'not-a-jwt')).toBe('7:access-only')
    expect(getSessionIdentity(jwt({ id: 7 }), jwt({ user_id: 7 }))).toBe('7:access-only')
  })

  it('stays the same when the access token is refreshed within one login', () => {
    const refresh = jwt({ jti: 'login-1' })
    expect(getSessionIdentity(jwt({ id: 7, jti: 'access-1' }), refresh)).toBe(
      getSessionIdentity(jwt({ id: 7, jti: 'access-2' }), refresh),
    )
  })

  it('changes for a new login as the same user and for another user', () => {
    const first = getSessionIdentity(jwt({ id: 7 }), jwt({ jti: 'login-1' }))
    expect(getSessionIdentity(jwt({ id: 7 }), jwt({ jti: 'login-2' }))).not.toBe(first)
    expect(getSessionIdentity(jwt({ id: 8 }), jwt({ jti: 'login-1' }))).not.toBe(first)
  })
})
