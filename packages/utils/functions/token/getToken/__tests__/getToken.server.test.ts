/**
 * @jest-environment node
 */
import { getItem } from 'expo-secure-store'

import { getToken } from '..'
import { ACCESS_KEY_NAME } from '../../../../constants/jwt'
import { getCookie } from '../../../cookie'

const serverCookieValue = 'server-value'

jest.mock('expo-secure-store', () => ({
  getItem: jest.fn(),
}))

jest.mock('../../../cookie', () => ({
  getCookie: jest.fn(),
}))

describe('getToken function on the server', () => {
  const accessKeyName = ACCESS_KEY_NAME

  beforeEach(() => {
    jest.clearAllMocks()
    process.env.EXPO_PUBLIC_PLATFORM = undefined // Ensure the platform is non-mobile to simulate server environment
  })

  it('retrieves a server-side cookie using getCookie', () => {
    ;(getCookie as jest.Mock).mockReturnValue(serverCookieValue)

    const result = getToken(accessKeyName)

    expect(result).toBe(serverCookieValue)
    expect(getCookie).toHaveBeenCalledWith(accessKeyName, { noSSR: false })
    expect(getItem).not.toHaveBeenCalled()
  })
})
