import preAuthenticateJWT from '..'

global.fetch = jest.fn()

const mockFetchResponse = (body = {}, ok = true, status = 200) => {
  const fetchMock = global.fetch as jest.Mock
  fetchMock.mockResolvedValueOnce({
    ok,
    status,
    json: () => Promise.resolve(body),
    headers: {
      get: () => 'application/json',
    },
  })
}

jest.mock('@baseapp-frontend/utils/functions/env', () => ({
  templateEnv: {
    NEXT_PUBLIC_TOKEN_TYPE: 'jwt',
    NEXT_PUBLIC_API_BASE_URL: 'http://localhost:3000',
  },
}))

describe('preAuthenticateJWT', () => {
  beforeEach(() => {
    jest.clearAllMocks()
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
    const fetchMock = global.fetch as jest.Mock
    fetchMock.mockRejectedValueOnce(new Error(errorMessage))

    await expect(preAuthenticateJWT('valid-jwt-token')).rejects.toThrow(errorMessage)
  })
})
