import { getItem } from 'expo-secure-store'
import type { Mock } from 'vitest'

import { getToken } from '..'
import { ACCESS_KEY_NAME } from '../../../../constants/jwt'
import { getCookie } from '../../../cookie'
import { isMobilePlatform } from '../../../os'

const clientCookieValue = 'client-value'
const mobileTokenValue = 'mobile-token-value'

vi.mock('expo-secure-store', async () => ({
  getItem: vi.fn(),
}))

vi.mock('../../../cookie', async () => ({
  getCookie: vi.fn(),
}))

vi.mock('../../../os', async () => ({
  isMobilePlatform: vi.fn(),
}))

describe('getToken', () => {
  const accessKeyName = ACCESS_KEY_NAME

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should retrieve the token from SecureStore on mobile platform', () => {
    ;(isMobilePlatform as Mock).mockReturnValue(true)
    ;(getItem as Mock).mockReturnValue(mobileTokenValue)

    const result = getToken(accessKeyName)

    expect(result).toBe(mobileTokenValue)
    expect(getItem).toHaveBeenCalledWith(accessKeyName)
    expect(getCookie).not.toHaveBeenCalled()
  })

  it('should retrieve the token using getCookie on non-mobile platform', () => {
    ;(isMobilePlatform as Mock).mockReturnValue(false)
    ;(getCookie as Mock).mockReturnValue(clientCookieValue)

    const result = getToken(accessKeyName)

    expect(result).toBe(clientCookieValue)
    expect(getCookie).toHaveBeenCalledWith(accessKeyName)
    expect(getItem).not.toHaveBeenCalled()
  })

  it('should use default ACCESS_KEY_NAME when no key is provided', () => {
    ;(isMobilePlatform as Mock).mockReturnValue(false)
    ;(getCookie as Mock).mockReturnValue(clientCookieValue)

    const result = getToken()

    expect(result).toBe(clientCookieValue)
    expect(getCookie).toHaveBeenCalledWith(ACCESS_KEY_NAME)
  })
})
