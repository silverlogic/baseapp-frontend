import { refreshAccessToken } from '..'
import { ACCESS_KEY_NAME, REFRESH_KEY_NAME } from '../../../../constants/jwt'

jest.mock('../../getTokens', () => ({
  getTokens: jest.fn(),
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
  const mockGetTokens = require('../../getTokens').getTokens
  const mockGetToken = require('../../getToken').getToken
  const mockSetTokenAsync = require('../../setTokenAsync').setTokenAsync
  const mockRemoveTokenAsync = require('../../removeTokenAsync').removeTokenAsync

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should refresh the access token and set it in cookies', async () => {
    const refreshToken = 'valid-refresh-token'
    const newAccessToken = 'new-access-token'

    mockGetTokens.mockResolvedValue({ access: newAccessToken })

    const result = await refreshAccessToken({ refreshToken })

    expect(mockGetTokens).toHaveBeenCalledWith(refreshToken)
    expect(mockSetTokenAsync).toHaveBeenCalledWith(ACCESS_KEY_NAME, newAccessToken, {
      secure: false,
    })
    expect(mockRemoveTokenAsync).not.toHaveBeenCalled()
    expect(result).toBe(newAccessToken)
  })

  it('should set refresh token cookie when a new refresh token is returned', async () => {
    const refreshToken = 'valid-refresh-token'
    const newAccessToken = 'new-access-token'
    const newRefreshToken = 'new-refresh-token'

    mockGetTokens.mockResolvedValue({ access: newAccessToken, refresh: newRefreshToken })

    const result = await refreshAccessToken({ refreshToken })

    expect(mockGetTokens).toHaveBeenCalledWith(refreshToken)
    expect(mockSetTokenAsync).toHaveBeenCalledWith(ACCESS_KEY_NAME, newAccessToken, {
      secure: false,
    })
    expect(mockSetTokenAsync).toHaveBeenCalledWith(REFRESH_KEY_NAME, newRefreshToken, {
      secure: false,
    })
    expect(mockRemoveTokenAsync).not.toHaveBeenCalled()
    expect(result).toBe(newAccessToken)
  })

  it('should remove tokens if refreshing the access token fails', async () => {
    const refreshToken = 'valid-refresh-token'

    mockGetTokens.mockRejectedValue(new Error('Failed to refresh token'))

    await expect(refreshAccessToken({ refreshToken })).rejects.toThrow('Failed to refresh token')

    expect(mockGetTokens).toHaveBeenCalledWith(refreshToken)
    expect(mockRemoveTokenAsync).toHaveBeenCalledWith(ACCESS_KEY_NAME)
    expect(mockRemoveTokenAsync).toHaveBeenCalledWith(REFRESH_KEY_NAME)
    expect(mockSetTokenAsync).not.toHaveBeenCalled()
  })

  it('should remove tokens if no refresh token is available', async () => {
    const refreshToken = null

    mockGetTokens.mockRejectedValue(new Error('No refresh token'))

    await expect(refreshAccessToken({ refreshToken })).rejects.toThrow('No refresh token')

    expect(mockGetTokens).toHaveBeenCalledWith(refreshToken)
    expect(mockRemoveTokenAsync).toHaveBeenCalledWith(ACCESS_KEY_NAME)
    expect(mockRemoveTokenAsync).toHaveBeenCalledWith(REFRESH_KEY_NAME)
    expect(mockSetTokenAsync).not.toHaveBeenCalled()
  })

  it('should use custom key names when provided', async () => {
    const refreshToken = 'valid-refresh-token'
    const newAccessToken = 'new-access-token'
    const customAccessKey = 'customAccess'
    const customRefreshKey = 'customRefresh'

    mockGetTokens.mockResolvedValue({ access: newAccessToken })

    await refreshAccessToken({
      refreshToken,
      accessKeyName: customAccessKey,
      refreshKeyName: customRefreshKey,
    })

    expect(mockSetTokenAsync).toHaveBeenCalledWith(customAccessKey, newAccessToken, {
      secure: false,
    })
  })
})
