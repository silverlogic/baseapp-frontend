import Cookies from 'js-cookie'

import { refreshAccessToken } from '..'
import { ACCESS_COOKIE_NAME, REFRESH_COOKIE_NAME } from '../../../../constants/cookie'
import { getAccessToken } from '../../getAccessToken'
import { getToken } from '../../getToken'

jest.mock('../../getAccessToken')
jest.mock('../../getToken')
jest.mock('js-cookie', () => ({
  set: jest.fn(),
  remove: jest.fn(),
}))

describe('refreshAccessToken', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should refresh the access token and set it in cookies', async () => {
    const refreshToken = 'valid-refresh-token'
    const getTokenMock = getToken as jest.Mock
    getTokenMock.mockReturnValue(refreshToken)

    const newAccessToken = 'new-access-token'
    const getAccessTokenMock = getAccessToken as jest.Mock
    getAccessTokenMock.mockResolvedValue(newAccessToken)

    const result = await refreshAccessToken()

    // Verify
    expect(getToken).toHaveBeenCalledWith(REFRESH_COOKIE_NAME)
    expect(getAccessToken).toHaveBeenCalledWith(refreshToken)
    expect(Cookies.set).toHaveBeenCalledWith(ACCESS_COOKIE_NAME, newAccessToken, {
      secure: false,
    })
    expect(result).toBe(newAccessToken)
  })

  it('should remove cookies if refreshing the access token fails', async () => {
    const refreshToken = 'valid-refresh-token'
    const getTokenMock = getToken as jest.Mock
    getTokenMock.mockReturnValue(refreshToken)

    const getAccessTokenMock = getAccessToken as jest.Mock
    getAccessTokenMock.mockRejectedValue(new Error('Failed to refresh token'))

    await expect(refreshAccessToken()).rejects.toThrow('Failed to refresh token')
    expect(getToken).toHaveBeenCalledWith(REFRESH_COOKIE_NAME)
    expect(getAccessToken).toHaveBeenCalledWith(refreshToken)
    expect(Cookies.remove).toHaveBeenCalledWith(ACCESS_COOKIE_NAME)
    expect(Cookies.remove).toHaveBeenCalledWith(REFRESH_COOKIE_NAME)
  })

  it('should remove cookies if no refresh token is available', async () => {
    const getTokenMock = getToken as jest.Mock
    getTokenMock.mockReturnValue('')

    await expect(refreshAccessToken()).rejects.toThrow()
    expect(getToken).toHaveBeenCalledWith(REFRESH_COOKIE_NAME)
    expect(Cookies.remove).toHaveBeenCalledWith(ACCESS_COOKIE_NAME)
    expect(Cookies.remove).toHaveBeenCalledWith(REFRESH_COOKIE_NAME)
  })
})
