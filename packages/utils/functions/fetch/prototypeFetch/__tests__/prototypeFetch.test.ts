import type { Mock } from 'vitest'

import { getPrototypeFetch, registerPrototypeFetch } from '..'
import { ACCESS_KEY_NAME, REFRESH_KEY_NAME } from '../../../../constants/jwt'
import { getAccessToken } from '../../../token/getAccessToken'
import { baseAppFetch } from '../../baseAppFetch'

vi.mock('js-cookie', () => ({ default: { get: vi.fn(), set: vi.fn(), remove: vi.fn() } }))

// The shared test setup replaces the global Response, so build a JSON response by hand.
const jsonResponse = (body: unknown, status = 200) =>
  ({
    ok: status < 400,
    status,
    headers: new Map([['content-type', 'application/json']]),
    json: async () => body,
  }) as unknown as Response

// The registry lives on globalThis; reset it so tests stay independent.
const unregisterPrototypeFetch = () => {
  delete (globalThis as Record<symbol, unknown>)[
    Symbol.for('@baseapp-frontend/utils/prototype-fetch')
  ]
}

const API_BASE_URL = 'https://api.example.com/v1'

describe('prototype fetch seam', () => {
  const networkFetch = vi.fn()
  const originalFetch = global.fetch
  const originalApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

  beforeEach(async () => {
    global.fetch = networkFetch
    process.env.NEXT_PUBLIC_API_BASE_URL = API_BASE_URL
    const Cookies = (await import('js-cookie')).default
    ;(Cookies.get as unknown as Mock).mockReturnValue(undefined)
  })

  afterEach(() => {
    unregisterPrototypeFetch()
    vi.clearAllMocks()
  })

  afterAll(() => {
    global.fetch = originalFetch
    if (originalApiBaseUrl === undefined) delete process.env.NEXT_PUBLIC_API_BASE_URL
    else process.env.NEXT_PUBLIC_API_BASE_URL = originalApiBaseUrl
  })

  it('is empty until an app registers a handler', () => {
    expect(getPrototypeFetch()).toBeUndefined()

    const handler = vi.fn()
    registerPrototypeFetch(handler)

    expect(getPrototypeFetch()).toBe(handler)
  })

  it('baseAppFetch calls the network when no handler is registered', async () => {
    networkFetch.mockResolvedValueOnce(jsonResponse({ id: 1 }))

    await baseAppFetch('/users/me')

    expect(networkFetch).toHaveBeenCalledWith(
      `${API_BASE_URL}/users/me`,
      expect.anything(),
    )
  })

  it('baseAppFetch sends the API path and request to the registered handler', async () => {
    const handler = vi.fn(async () => jsonResponse({ first_name: 'Ada' }))
    registerPrototypeFetch(handler)

    const response = await baseAppFetch('/auth/login', {
      method: 'POST',
      body: { email: 'ada@prototype.local', password: 'x' },
      params: { nextPage: 2 },
    })

    expect(networkFetch).not.toHaveBeenCalled()
    expect(handler).toHaveBeenCalledWith(
      '/auth/login?next_page=2',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ email: 'ada@prototype.local', password: 'x' }),
      }),
      { baseUrl: API_BASE_URL },
    )
    // The rest of baseAppFetch still applies, here camelizing the response.
    expect(response).toEqual({ firstName: 'Ada' })
  })

  it('baseAppFetch tells the handler which base URL the caller asked for', async () => {
    const handler = vi.fn(async () => jsonResponse({}))
    registerPrototypeFetch(handler)

    await baseAppFetch('/pages', { baseUrl: 'https://cms.example.com/api/v2' })

    expect(handler).toHaveBeenCalledWith('/pages', expect.anything(), {
      baseUrl: 'https://cms.example.com/api/v2',
    })
  })

  it('baseAppFetch throws on a handler error response, as it does for the API', async () => {
    registerPrototypeFetch(async () => jsonResponse({ detail: 'Not available' }, 404))

    await expect(baseAppFetch('/somewhere')).rejects.toThrow('Not available')
  })

  it('baseAppFetch refreshes an expired token through the handler', async () => {
    const Cookies = (await import('js-cookie')).default
    const expired = `e30.${btoa(JSON.stringify({ exp: 1 }))}.`
    ;(Cookies.get as unknown as Mock).mockImplementation((key: string) => {
      if (key === ACCESS_KEY_NAME) return expired
      if (key === REFRESH_KEY_NAME) return 'refresh-token'
      return undefined
    })
    const handler = vi.fn(async (path: string) =>
      path === '/auth/refresh' ? jsonResponse({ access: 'fresh-token' }) : jsonResponse({}),
    )
    registerPrototypeFetch(handler)

    await baseAppFetch('/users/me')

    expect(handler).toHaveBeenNthCalledWith(1, '/auth/refresh', expect.anything(), {
      baseUrl: API_BASE_URL,
    })
    expect(handler).toHaveBeenNthCalledWith(
      2,
      '/users/me',
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: 'Bearer fresh-token' }),
      }),
      { baseUrl: API_BASE_URL },
    )
    expect(networkFetch).not.toHaveBeenCalled()
  })

  it('getAccessToken sends /auth/refresh to the registered handler', async () => {
    const handler = vi.fn(async () => jsonResponse({ access: 'fresh-token' }))
    registerPrototypeFetch(handler)

    await expect(getAccessToken('refresh-token')).resolves.toBe('fresh-token')

    expect(networkFetch).not.toHaveBeenCalled()
    expect(handler).toHaveBeenCalledWith(
      '/auth/refresh',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ refresh: 'refresh-token' }),
      }),
      { baseUrl: API_BASE_URL },
    )
  })
})
