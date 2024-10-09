import { getItemAsync } from 'expo-secure-store'

import { getTokenAsync } from '..'
import { ACCESS_KEY_NAME } from '../../../../constants/jwt'
import { getCookieAsync } from '../../../cookie'

const clientCookieValue = 'client-value'
const mobileTokenValue = 'mobile-token-value'

jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
}))

jest.mock('../../../cookie', () => ({
  getCookieAsync: jest.fn(),
}))

describe('getTokenAsync', () => {
  const accessKeyName = ACCESS_KEY_NAME

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should retrieve the token from SecureStore on mobile platform', async () => {
    process.env.EXPO_PUBLIC_PLATFORM = 'mobile'
    ;(getItemAsync as jest.Mock).mockResolvedValue(mobileTokenValue)

    const result = await getTokenAsync(accessKeyName)

    expect(result).toBe(mobileTokenValue)
    expect(getItemAsync).toHaveBeenCalledWith(accessKeyName)
    expect(getCookieAsync).not.toHaveBeenCalled()
  })

  it('should retrieve the token using getCookieAsync on non-mobile platform', async () => {
    process.env.EXPO_PUBLIC_PLATFORM = undefined
    ;(getCookieAsync as jest.Mock).mockResolvedValue(clientCookieValue)

    const result = await getTokenAsync(accessKeyName)

    expect(result).toBe(clientCookieValue)
    expect(getCookieAsync).toHaveBeenCalledWith(accessKeyName, { noSSR: false })
    expect(getItemAsync).not.toHaveBeenCalled()
  })

  it('should retrieve a client-side cookie using getCookieAsync with noSSR option set to true', async () => {
    process.env.EXPO_PUBLIC_PLATFORM = undefined
    ;(getCookieAsync as jest.Mock).mockResolvedValue(clientCookieValue)

    const result = await getTokenAsync(accessKeyName, { noSSR: true })

    expect(result).toBe(clientCookieValue)
    expect(getCookieAsync).toHaveBeenCalledWith(accessKeyName, { noSSR: true })
    expect(getItemAsync).not.toHaveBeenCalled()
  })
})