import { headers as incomingHeaders } from 'next/headers'
import type { Mock } from 'vitest'

import { getAccessToken } from '..'
import { getExpoConstant } from '../../../expo'

vi.mock('next/headers', async () => ({
  headers: vi.fn(),
}))
vi.mock('../../../expo', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../../expo')>()
  return { getExpoConstant: vi.fn(actual.getExpoConstant) }
})

global.fetch = vi.fn()

const mockFetchResponse = (body = {}, ok = true, status = 200) => {
  const fetchMock = global.fetch as Mock
  fetchMock.mockResolvedValueOnce({
    ok,
    status,
    json: () => Promise.resolve(body),
  })
}

describe('getAccessToken', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should throw an error if no refresh token is provided', async () => {
    await expect(getAccessToken('')).rejects.toThrow('No refresh token provided.')
  })

  it('should call fetch with the correct URL and headers', async () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = 'http://localhost:3000'

    const refreshToken = 'test-refresh-token'
    const expectedUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`
    mockFetchResponse({ access: 'test-access-token' })

    await getAccessToken(refreshToken)

    expect(fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'POST',
      body: JSON.stringify({ refresh: refreshToken }),
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })

  it('should return the access token on success', async () => {
    const expectedAccessToken = 'test-access-token'
    mockFetchResponse({ access: expectedAccessToken })

    const accessToken = await getAccessToken('valid-refresh-token')

    expect(accessToken).toBe(expectedAccessToken)
  })

  it('should handle fetch errors gracefully', async () => {
    const errorMessage = 'Network error'
    const fetchMock = global.fetch as Mock
    fetchMock.mockRejectedValueOnce(new Error(errorMessage))

    await expect(getAccessToken('valid-refresh-token')).rejects.toThrow(errorMessage)
  })

  describe('with an absolute API address', () => {
    let originalWindow: typeof globalThis.window

    const expectUnchangedRefreshCall = (url: string) => {
      expect(fetch).toHaveBeenCalledWith(url, {
        method: 'POST',
        body: JSON.stringify({ refresh: 'test-refresh-token' }),
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json' },
      })
      expect(incomingHeaders).not.toHaveBeenCalled()
    }

    beforeEach(() => {
      originalWindow = global.window
      vi.stubEnv('INTERNAL_API_ORIGIN', 'http://web:8000')
      mockFetchResponse({ access: 'test-access-token' })
    })

    afterEach(() => {
      global.window = originalWindow
      vi.unstubAllEnvs()
    })

    it('calls it unchanged on the server', async () => {
      delete (global as any).window
      vi.stubEnv('NEXT_PUBLIC_API_BASE_URL', 'https://api.example.com/v1')

      await getAccessToken('test-refresh-token')

      expectUnchangedRefreshCall('https://api.example.com/v1/auth/refresh')
    })

    it('calls the Expo address unchanged in a mobile app', async () => {
      // React Native has a `window` but no `location`, and no NEXT_PUBLIC_* values.
      Object.defineProperty(global, 'window', { value: {}, writable: true, configurable: true })
      vi.stubEnv('NEXT_PUBLIC_API_BASE_URL', undefined)
      ;(getExpoConstant as Mock).mockReturnValueOnce('http://192.168.3.4:8000/v1')

      await getAccessToken('test-refresh-token')

      expect(getExpoConstant).toHaveBeenCalledWith('EXPO_PUBLIC_API_BASE_URL')
      expectUnchangedRefreshCall('http://192.168.3.4:8000/v1/auth/refresh')
    })
  })

  describe('with a relative API address', () => {
    let originalWindow: typeof globalThis.window

    beforeEach(() => {
      originalWindow = global.window
      vi.stubEnv('NEXT_PUBLIC_API_BASE_URL', '/v1')
      vi.stubEnv('INTERNAL_API_ORIGIN', 'http://web:8000')
      ;(incomingHeaders as Mock).mockResolvedValue(
        new Headers({ 'x-forwarded-host': 'tenant.example.com' }),
      )
      mockFetchResponse({ access: 'test-access-token' })
    })

    afterEach(() => {
      global.window = originalWindow
      vi.unstubAllEnvs()
    })

    const expectRefreshCall = (url: string, forwardedHeaders: Record<string, string>) => {
      expect(fetch).toHaveBeenCalledWith(url, {
        method: 'POST',
        body: JSON.stringify({ refresh: 'test-refresh-token' }),
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json', ...forwardedHeaders },
      })
    }

    it('refreshes on the page host in the browser', async () => {
      await getAccessToken('test-refresh-token')

      expectRefreshCall('/v1/auth/refresh', {})
    })

    it('refreshes through the internal origin on the server, forwarding the host', async () => {
      delete (global as any).window

      await getAccessToken('test-refresh-token')

      expectRefreshCall('http://web:8000/v1/auth/refresh', {
        'X-Forwarded-Host': 'tenant.example.com',
      })
    })

    it('forwards the given host instead of the request one', async () => {
      delete (global as any).window

      await getAccessToken('test-refresh-token', { host: 'other.example.com' })

      expectRefreshCall('http://web:8000/v1/auth/refresh', {
        'X-Forwarded-Host': 'other.example.com',
      })
    })

    it('rejects on the server without INTERNAL_API_ORIGIN', async () => {
      delete (global as any).window
      vi.stubEnv('INTERNAL_API_ORIGIN', '')

      await expect(getAccessToken('test-refresh-token')).rejects.toThrow('INTERNAL_API_ORIGIN')
      expect(fetch).not.toHaveBeenCalled()
    })
  })
})
