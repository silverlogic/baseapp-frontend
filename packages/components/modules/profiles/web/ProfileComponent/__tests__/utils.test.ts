import { getProfileShareUrl } from '../utils'

describe('getProfileShareUrl', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  test.each([
    ['absolute', 'https://app.example.com', 'https://app.example.com/jane'],
    ['empty', '', '/jane'],
    ['unset', undefined, '/jane'],
  ])('keeps the configured address when it is %s', (_, appBaseUrl, expected) => {
    vi.stubEnv('NEXT_PUBLIC_APP_BASE_URL', appBaseUrl)

    expect(getProfileShareUrl('/jane')).toBe(expected)
  })

  test.each([
    ['/', '/jane'],
    ['/app', '/app/jane'],
    ['/app/', '/app/jane'],
  ])('uses the host the user is on when the address is relative (%s)', (appBaseUrl, path) => {
    vi.stubEnv('NEXT_PUBLIC_APP_BASE_URL', appBaseUrl)

    expect(getProfileShareUrl('/jane')).toBe(`${window.location.origin}${path}`)
  })
})
