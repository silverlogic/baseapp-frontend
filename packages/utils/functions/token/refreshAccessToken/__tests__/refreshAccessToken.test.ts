import type { Mock } from 'vitest'

import { refreshAccessToken } from '..'
import { ACCESS_KEY_NAME, REFRESH_KEY_NAME } from '../../../../constants/jwt'
import { getAccessToken } from '../../getAccessToken'
import { getToken } from '../../getToken'
import { removeTokenAsync } from '../../removeTokenAsync'
import { setTokenAsync } from '../../setTokenAsync'

vi.mock('../../getAccessToken', async () => ({
  getAccessToken: vi.fn(),
}))

vi.mock('../../getToken', async () => ({
  getToken: vi.fn(),
}))

vi.mock('../../setTokenAsync', async () => ({
  setTokenAsync: vi.fn(),
}))

vi.mock('../../removeTokenAsync', async () => ({
  removeTokenAsync: vi.fn(),
}))

vi.mock('js-cookie', async () => ({
  set: vi.fn(),
  remove: vi.fn(),
}))

describe('refreshAccessToken', () => {
  const mockGetAccessToken = getAccessToken as Mock
  const mockGetToken = getToken as Mock
  const mockSetTokenAsync = setTokenAsync as Mock
  const mockRemoveTokenAsync = removeTokenAsync as Mock

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should refresh the access token and set it in cookies', async () => {
    const refreshToken = 'valid-refresh-token'
    const newAccessToken = 'new-access-token'

    mockGetAccessToken.mockResolvedValue(newAccessToken)

    const result = await refreshAccessToken({ refreshToken })

    expect(mockGetAccessToken).toHaveBeenCalledWith(refreshToken)
    expect(mockSetTokenAsync).toHaveBeenCalledWith(ACCESS_KEY_NAME, newAccessToken, {
      secure: false,
    })
    expect(mockRemoveTokenAsync).not.toHaveBeenCalled()
    expect(result).toBe(newAccessToken)
  })

  it('should remove tokens if refreshing the access token fails', async () => {
    const refreshToken = 'valid-refresh-token'

    mockGetAccessToken.mockRejectedValue(new Error('Failed to refresh token'))

    await expect(refreshAccessToken({ refreshToken })).rejects.toThrow('Failed to refresh token')

    expect(mockGetAccessToken).toHaveBeenCalledWith(refreshToken)
    expect(mockRemoveTokenAsync).toHaveBeenCalledWith(ACCESS_KEY_NAME)
    expect(mockRemoveTokenAsync).toHaveBeenCalledWith(REFRESH_KEY_NAME)
    expect(mockSetTokenAsync).not.toHaveBeenCalled()
  })

  it('should remove tokens if no refresh token is available', async () => {
    const refreshToken = null

    mockGetAccessToken.mockRejectedValue(new Error('No refresh token'))

    await expect(refreshAccessToken({ refreshToken })).rejects.toThrow('No refresh token')

    expect(mockGetAccessToken).toHaveBeenCalledWith(refreshToken)
    expect(mockRemoveTokenAsync).toHaveBeenCalledWith(ACCESS_KEY_NAME)
    expect(mockRemoveTokenAsync).toHaveBeenCalledWith(REFRESH_KEY_NAME)
    expect(mockSetTokenAsync).not.toHaveBeenCalled()
  })

  it('should use custom key names when provided', async () => {
    const refreshToken = 'valid-refresh-token'
    const newAccessToken = 'new-access-token'
    const customAccessKey = 'customAccess'
    const customRefreshKey = 'customRefresh'

    mockGetAccessToken.mockResolvedValue(newAccessToken)

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
