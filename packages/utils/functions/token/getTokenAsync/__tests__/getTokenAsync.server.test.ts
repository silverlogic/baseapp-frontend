/**
 * @jest-environment node
 */
import { getItemAsync } from 'expo-secure-store'

import { getTokenAsync } from '..'
import { ACCESS_KEY_NAME } from '../../../../constants/jwt'
import { getCookieAsync } from '../../../cookie'

const serverCookieValue = 'server-value'

jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
}))

jest.mock('../../../cookie', () => ({
  getCookieAsync: jest.fn(),
}))

describe('getTokenAsync function on the server', () => {
  const accessKeyName = ACCESS_KEY_NAME

  beforeEach(() => {
    jest.clearAllMocks()
    process.env.EXPO_PUBLIC_PLATFORM = undefined // Ensure we're not in a mobile environment
  })

  it('retrieves a server-side cookie using getCookieAsync', async () => {
    ;(getCookieAsync as jest.Mock).mockResolvedValue(serverCookieValue)

    const result = await getTokenAsync(accessKeyName)

    expect(result).toBe(serverCookieValue)
    expect(getCookieAsync).toHaveBeenCalledWith(accessKeyName, { noSSR: false })
    expect(getItemAsync).not.toHaveBeenCalled()
  })

  it('retrieves a server-side cookie using getCookieAsync with noSSR option', async () => {
    ;(getCookieAsync as jest.Mock).mockResolvedValue(serverCookieValue)

    const result = await getTokenAsync(accessKeyName, { noSSR: true })

    expect(result).toBe(serverCookieValue)
    expect(getCookieAsync).toHaveBeenCalledWith(accessKeyName, { noSSR: true })
    expect(getItemAsync).not.toHaveBeenCalled()
  })
})
