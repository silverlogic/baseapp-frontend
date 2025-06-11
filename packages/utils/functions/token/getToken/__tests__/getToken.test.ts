import { getItem } from 'expo-secure-store'

import { getToken } from '..'
import { ACCESS_KEY_NAME } from '../../../../constants/jwt'
import { getCookie } from '../../../cookie'
import { isMobilePlatform } from '../../../os'

const clientCookieValue = 'client-value'
const mobileTokenValue = 'mobile-token-value'

jest.mock('expo-secure-store', () => ({
  getItem: jest.fn(),
}))

jest.mock('../../../cookie', () => ({
  getCookie: jest.fn(),
}))

jest.mock('../../../os', () => ({
  isMobilePlatform: jest.fn(),
}))

describe('getToken', () => {
  const accessKeyName = ACCESS_KEY_NAME

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should retrieve the token from SecureStore on mobile platform', () => {
    ;(isMobilePlatform as jest.Mock).mockReturnValue(true)
    ;(getItem as jest.Mock).mockReturnValue(mobileTokenValue)

    const result = getToken(accessKeyName)

    expect(result).toBe(mobileTokenValue)
    expect(getItem).toHaveBeenCalledWith(accessKeyName)
    expect(getCookie).not.toHaveBeenCalled()
  })

  it('should retrieve the token using getCookie on non-mobile platform', () => {
    ;(isMobilePlatform as jest.Mock).mockReturnValue(false)
    ;(getCookie as jest.Mock).mockReturnValue(clientCookieValue)

    const result = getToken(accessKeyName)

    expect(result).toBe(clientCookieValue)
    expect(getCookie).toHaveBeenCalledWith(accessKeyName)
    expect(getItem).not.toHaveBeenCalled()
  })

  it('should use default ACCESS_KEY_NAME when no key is provided', () => {
    ;(isMobilePlatform as jest.Mock).mockReturnValue(false)
    ;(getCookie as jest.Mock).mockReturnValue(clientCookieValue)

    const result = getToken()

    expect(result).toBe(clientCookieValue)
    expect(getCookie).toHaveBeenCalledWith(ACCESS_KEY_NAME)
  })
})
