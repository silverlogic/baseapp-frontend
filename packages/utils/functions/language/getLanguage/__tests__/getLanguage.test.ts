import { getItem } from 'expo-secure-store'
import type { Mock } from 'vitest'

import { getLanguage } from '..'
import { LANGUAGE_COOKIE_NAME } from '../../../../constants/cookie'
import { getCookie } from '../../../cookie'
import { isMobilePlatform } from '../../../os'

const clientCookieValue = 'client-language-value'
const mobileLanguageValue = 'mobile-language-value'

vi.mock('expo-secure-store', async () => ({
  getItem: vi.fn(),
}))

vi.mock('../../../cookie', async () => ({
  getCookie: vi.fn(),
}))

vi.mock('../../../os', async () => ({
  isMobilePlatform: vi.fn(),
}))

describe('getLanguage', () => {
  const accessKeyName = LANGUAGE_COOKIE_NAME

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should retrieve the language from SecureStore on mobile platform', () => {
    ;(isMobilePlatform as Mock).mockReturnValue(true)
    ;(getItem as Mock).mockReturnValue(mobileLanguageValue)

    const result = getLanguage(accessKeyName)

    expect(result).toBe(mobileLanguageValue)
    expect(getItem).toHaveBeenCalledWith(accessKeyName)
    expect(getCookie).not.toHaveBeenCalled()
  })

  it('should retrieve the language using getCookie on non-mobile platform', () => {
    ;(isMobilePlatform as Mock).mockReturnValue(false)
    ;(getCookie as Mock).mockReturnValue(clientCookieValue)

    const result = getLanguage(accessKeyName)

    expect(result).toBe(clientCookieValue)
    expect(getCookie).toHaveBeenCalledWith(accessKeyName)
    expect(getItem).not.toHaveBeenCalled()
  })

  it('should use default LANGUAGE_COOKIE_NAME when no key is provided', () => {
    ;(isMobilePlatform as Mock).mockReturnValue(false)
    ;(getCookie as Mock).mockReturnValue(clientCookieValue)

    const result = getLanguage()

    expect(result).toBe(clientCookieValue)
    expect(getCookie).toHaveBeenCalledWith(LANGUAGE_COOKIE_NAME)
  })
})
