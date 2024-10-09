import Cookies from 'js-cookie'

import { refreshAccessToken } from '..'
import { ACCESS_KEY_NAME, REFRESH_KEY_NAME } from '../../../../constants/jwt'
import { getAccessToken } from '../../getAccessToken'
import { getToken } from '../../getToken'
import { setTokenAsync } from '../../setTokenAsync'

jest.mock('../../getAccessToken')
jest.mock('../../getToken')
jest.mock('js-cookie', () => ({
  set: jest.fn(),
  remove: jest.fn(),
}))

jest.mock('../../setTokenAsync')

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

    await refreshAccessToken()

    expect(getToken).toHaveBeenCalledWith(REFRESH_KEY_NAME)
    expect(getAccessToken).toHaveBeenCalledWith(refreshToken)
    expect(setTokenAsync).toHaveBeenCalledWith(ACCESS_KEY_NAME, newAccessToken, {
      secure: false,
    })
  })

  it('should remove tokens if refreshing the access token fails', async () => {
    const refreshToken = 'valid-refresh-token'
    const getTokenMock = getToken as jest.Mock
    getTokenMock.mockReturnValue(refreshToken)

    const getAccessTokenMock = getAccessToken as jest.Mock
    getAccessTokenMock.mockRejectedValue(new Error('Failed to refresh token'))

    await expect(refreshAccessToken()).rejects.toThrow('Failed to refresh token')
    expect(getToken).toHaveBeenCalledWith(REFRESH_KEY_NAME)
    expect(getAccessToken).toHaveBeenCalledWith(refreshToken)
    expect(Cookies.remove).toHaveBeenCalledWith(ACCESS_KEY_NAME)
    expect(Cookies.remove).toHaveBeenCalledWith(REFRESH_KEY_NAME)
  })

  it('should remove tokens if no refresh token is available', async () => {
    const getTokenMock = getToken as jest.Mock
    getTokenMock.mockReturnValue('')

    await expect(refreshAccessToken()).rejects.toThrow()
    expect(getToken).toHaveBeenCalledWith(REFRESH_KEY_NAME)
    expect(Cookies.remove).toHaveBeenCalledWith(ACCESS_KEY_NAME)
    expect(Cookies.remove).toHaveBeenCalledWith(REFRESH_KEY_NAME)
  })
})
