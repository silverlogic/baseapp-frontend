import { getAccessToken } from '..'
import { templateEnv } from '../../../env'

global.fetch = jest.fn()

const mockFetchResponse = (body = {}, ok = true, status = 200) => {
  const fetchMock = global.fetch as jest.Mock
  fetchMock.mockResolvedValueOnce({
    ok,
    status,
    json: () => Promise.resolve(body),
  })
}

describe('getAccessToken', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should throw an error if no refresh token is provided', async () => {
    await expect(getAccessToken('')).rejects.toThrow('No refresh token provided.')
  })

  it('should call fetch with the correct URL and headers', async () => {
    const refreshToken = 'test-refresh-token'
    const expectedUrl = `${templateEnv.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`
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
    const fetchMock = global.fetch as jest.Mock
    fetchMock.mockRejectedValueOnce(new Error(errorMessage))

    await expect(getAccessToken('valid-refresh-token')).rejects.toThrow(errorMessage)
  })
})
