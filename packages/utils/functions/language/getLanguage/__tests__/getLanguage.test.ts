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

const serverCookies = { get: vi.fn() }
vi.mock('next/headers', async () => ({
  cookies: vi.fn(async () => serverCookies),
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

  it('should read the language from request cookies on the server', async () => {
    ;(isMobilePlatform as Mock).mockReturnValue(false)
    serverCookies.get.mockReturnValue({ value: 'es' })
    vi.stubGlobal('window', undefined)

    const result = await getLanguage(accessKeyName)

    vi.unstubAllGlobals()
    expect(result).toBe('es')
    expect(serverCookies.get).toHaveBeenCalledWith(accessKeyName)
    expect(getCookie).not.toHaveBeenCalled()
  })
})
