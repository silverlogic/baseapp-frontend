import { formatRemainingTime, getRemainingTime, isSessionTokenUnusable, reloadAt } from '../utils'

const tokenExpiringAt = (exp: number) =>
  [
    Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url'),
    Buffer.from(JSON.stringify({ exp })).toString('base64url'),
    'signature',
  ].join('.')

describe('getRemainingTime', () => {
  const now = Date.parse('2026-10-22T10:00:00Z')

  test('returns the milliseconds left', () => {
    expect(getRemainingTime('2026-10-22T10:30:00Z', now)).toBe(30 * 60 * 1000)
  })

  test('never goes below zero', () => {
    expect(getRemainingTime('2026-10-22T09:00:00Z', now)).toBe(0)
  })

  test('returns null without a usable date', () => {
    expect(getRemainingTime(null, now)).toBeNull()
    expect(getRemainingTime(undefined, now)).toBeNull()
    expect(getRemainingTime('not a date', now)).toBeNull()
  })
})

describe('formatRemainingTime', () => {
  test.each([
    [0, '0:00'],
    [999, '0:01'],
    [65 * 1000, '1:05'],
    [59 * 60 * 1000 + 59 * 1000, '59:59'],
    [60 * 60 * 1000, '1:00:00'],
    [2 * 60 * 60 * 1000 + 3 * 60 * 1000 + 4 * 1000, '2:03:04'],
    [-5000, '0:00'],
  ])('formats %d ms as %s', (ms, expected) => {
    expect(formatRemainingTime(ms)).toBe(expected)
  })
})

describe('isSessionTokenUnusable', () => {
  const nowInSeconds = Math.floor(Date.now() / 1000)

  test('a token that has not expired is usable', () => {
    expect(isSessionTokenUnusable(tokenExpiringAt(nowInSeconds + 600))).toBe(false)
  })

  test('an expired, malformed or missing token is not', () => {
    expect(isSessionTokenUnusable(tokenExpiringAt(nowInSeconds - 1))).toBe(true)
    expect(isSessionTokenUnusable('not-a-jwt')).toBe(true)
    expect(isSessionTokenUnusable(undefined)).toBe(true)
  })
})

describe('reloadAt', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  test('warns where there is no page to reload (native)', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    vi.stubGlobal('window', {})

    reloadAt('/')

    expect(warn).toHaveBeenCalledWith(expect.stringContaining('onStarted / onEnded'))
  })
})
