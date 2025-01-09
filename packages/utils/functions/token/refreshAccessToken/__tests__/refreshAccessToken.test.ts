import { refreshAccessToken } from '..'
import { ACCESS_KEY_NAME, REFRESH_KEY_NAME } from '../../../../constants/jwt'

jest.mock('../../getAccessToken', () => ({
  getAccessToken: jest.fn(),
}))

jest.mock('../../getToken', () => ({
  getToken: jest.fn(),
}))

jest.mock('../../setTokenAsync', () => ({
  setTokenAsync: jest.fn(),
}))

jest.mock('../../removeTokenAsync', () => ({
  removeTokenAsync: jest.fn(),
}))

jest.mock('js-cookie', () => ({
  set: jest.fn(),
  remove: jest.fn(),
}))

describe('refreshAccessToken', () => {
  const mockGetAccessToken = require('../../getAccessToken').getAccessToken
  const mockGetToken = require('../../getToken').getToken
  const mockSetTokenAsync = require('../../setTokenAsync').setTokenAsync
  const mockRemoveTokenAsync = require('../../removeTokenAsync').removeTokenAsync

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should refresh the access token and set it in cookies', async () => {
    const refreshToken = 'valid-refresh-token'
    const newAccessToken = 'new-access-token'

    mockGetToken.mockReturnValue(refreshToken)
    mockGetAccessToken.mockResolvedValue(newAccessToken)

    await refreshAccessToken()

    expect(mockGetToken).toHaveBeenCalledWith(REFRESH_KEY_NAME)
    expect(mockGetAccessToken).toHaveBeenCalledWith(refreshToken)
    expect(mockSetTokenAsync).toHaveBeenCalledWith(ACCESS_KEY_NAME, newAccessToken, {
      secure: false,
    })
    expect(mockRemoveTokenAsync).not.toHaveBeenCalled()
  })

  it('should remove tokens if refreshing the access token fails', async () => {
    const refreshToken = 'valid-refresh-token'

    mockGetToken.mockReturnValue(refreshToken)
    mockGetAccessToken.mockRejectedValue(new Error('Failed to refresh token'))

    await expect(refreshAccessToken()).rejects.toThrow('Failed to refresh token')

    expect(mockGetToken).toHaveBeenCalledWith(REFRESH_KEY_NAME)
    expect(mockGetAccessToken).toHaveBeenCalledWith(refreshToken)
    expect(mockRemoveTokenAsync).toHaveBeenCalledWith(ACCESS_KEY_NAME)
    expect(mockRemoveTokenAsync).toHaveBeenCalledWith(REFRESH_KEY_NAME)
    expect(mockSetTokenAsync).not.toHaveBeenCalled()
  })

  it('should remove tokens if no refresh token is available', async () => {
    mockGetToken.mockReturnValue('')

    await expect(refreshAccessToken()).rejects.toThrow()

    expect(mockGetToken).toHaveBeenCalledWith(REFRESH_KEY_NAME)
    expect(mockRemoveTokenAsync).toHaveBeenCalledWith(ACCESS_KEY_NAME)
    expect(mockRemoveTokenAsync).toHaveBeenCalledWith(REFRESH_KEY_NAME)
    expect(mockSetTokenAsync).not.toHaveBeenCalled()
  })
})
