import { resolveApiUrl } from '@baseapp-frontend/utils/functions/api/resolveApiUrl'

import preAuthenticateJWT from '..'

vi.mock('@baseapp-frontend/utils/functions/api/resolveApiUrl', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@baseapp-frontend/utils/functions/api/resolveApiUrl')>()
  return { resolveApiUrl: vi.fn(actual.resolveApiUrl) }
})

global.fetch = vi.fn()

const mockFetchResponse = (body = {}, ok = true, status = 200) => {
  const fetchMock = global.fetch as Mock
  fetchMock.mockResolvedValueOnce({
    ok,
    status,
    json: () => Promise.resolve(body),
    headers: {
      get: () => 'application/json',
    },
  })
}

describe('preAuthenticateJWT', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_API_BASE_URL = 'http://localhost:3000'
    vi.clearAllMocks()
  })

  it('should throw an error if no token is provided', async () => {
    await expect(preAuthenticateJWT()).rejects.toThrow('No token provided.')
  })

  it('should call fetch with the correct URL and headers', async () => {
    const token = 'test-jwt-token'
    const expectedUrl = 'http://localhost:3000/auth/pre-auth/jwt'
    mockFetchResponse({ success: true })

    await preAuthenticateJWT(token)

    expect(fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'POST',
      body: JSON.stringify({ token }),
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })

  it('should return a response on successful pre-authentication', async () => {
    const responseData = { success: true, details: 'User authenticated.' }
    mockFetchResponse(responseData)

    const response = await preAuthenticateJWT('valid-jwt-token')

    expect(response).toEqual(responseData)
  })

  it('should handle network or server errors gracefully', async () => {
    const errorMessage = 'Network error'
    const fetchMock = global.fetch as Mock
    fetchMock.mockRejectedValueOnce(new Error(errorMessage))

    await expect(preAuthenticateJWT('valid-jwt-token')).rejects.toThrow(errorMessage)
  })

  it('calls an absolute address unchanged on the server', async () => {
    const originalWindow = global.window
    delete (global as any).window
    vi.stubEnv('INTERNAL_API_ORIGIN', 'http://web:8000')
    mockFetchResponse({ success: true })

    try {
      await preAuthenticateJWT('test-jwt-token')
    } finally {
      global.window = originalWindow
      vi.unstubAllEnvs()
    }

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/auth/pre-auth/jwt', {
      method: 'POST',
      body: JSON.stringify({ token: 'test-jwt-token' }),
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    })
  })

  it('calls the address and sends the headers the API address resolves to', async () => {
    ;(resolveApiUrl as Mock).mockResolvedValueOnce({
      url: 'http://web:8000/v1',
      headers: { 'X-Forwarded-Host': 'tenant.example.com' },
    })
    mockFetchResponse({ success: true })

    await preAuthenticateJWT('test-jwt-token', { host: 'tenant.example.com' })

    expect(resolveApiUrl).toHaveBeenCalledWith('http://localhost:3000', {
      host: 'tenant.example.com',
    })
    expect(fetch).toHaveBeenCalledWith('http://web:8000/v1/auth/pre-auth/jwt', {
      method: 'POST',
      body: JSON.stringify({ token: 'test-jwt-token' }),
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json', 'X-Forwarded-Host': 'tenant.example.com' },
    })
  })
})
