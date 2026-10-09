import { getCookie, isMobilePlatform } from '@baseapp-frontend/utils'

import { getItem } from 'expo-secure-store'
import type { Mock } from 'vitest'

import { getLanguage } from '..'
import { LANGUAGE_COOKIE_NAME } from '../../../types'

const clientCookieValue = 'client-language-value'
const mobileLanguageValue = 'mobile-language-value'

vi.mock('expo-secure-store', async () => ({
  getItem: vi.fn(),
}))

vi.mock('@baseapp-frontend/utils', async () => ({
  getCookie: vi.fn(),
  isMobilePlatform: vi.fn(),
}))

describe('getLanguage', () => {
  const accessKeyName = LANGUAGE_COOKIE_NAME

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should retrieve the language from SecureStore on mobile platform', async () => {
    ;(isMobilePlatform as Mock).mockReturnValue(true)
    ;(getItem as Mock).mockReturnValue(mobileLanguageValue)

    const result = await getLanguage(accessKeyName)

    expect(result).toBe(mobileLanguageValue)
    expect(getItem).toHaveBeenCalledWith(accessKeyName)
    expect(getCookie).not.toHaveBeenCalled()
  })

  it('should retrieve the language using getCookie on non-mobile platform', async () => {
    ;(isMobilePlatform as Mock).mockReturnValue(false)
    ;(getCookie as Mock).mockReturnValue(clientCookieValue)

    const result = await getLanguage(accessKeyName)

    expect(result).toBe(clientCookieValue)
    expect(getCookie).toHaveBeenCalledWith(accessKeyName)
    expect(getItem).not.toHaveBeenCalled()
  })

  it('should use default LANGUAGE_COOKIE_NAME when no key is provided', async () => {
    ;(isMobilePlatform as Mock).mockReturnValue(false)
    ;(getCookie as Mock).mockReturnValue(clientCookieValue)

    const result = await getLanguage()

    expect(result).toBe(clientCookieValue)
    expect(getCookie).toHaveBeenCalledWith(LANGUAGE_COOKIE_NAME)
  })
})
