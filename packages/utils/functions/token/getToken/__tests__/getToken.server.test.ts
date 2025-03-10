/**
 * @jest-environment node
 */
import { getItem } from 'expo-secure-store'

import { getToken } from '..'
import { ACCESS_KEY_NAME } from '../../../../constants/jwt'
import { getCookie } from '../../../cookie'
import { isMobilePlatform } from '../../../os'

const serverCookieValue = 'server-value'

jest.mock('expo-secure-store', () => ({
  getItem: jest.fn(),
}))

jest.mock('../../../cookie', () => ({
  getCookie: jest.fn(),
}))

jest.mock('../../../os', () => ({
  isMobilePlatform: jest.fn(),
}))

describe('getToken function on the server', () => {
  const accessKeyName = ACCESS_KEY_NAME

  beforeEach(() => {
    jest.clearAllMocks()
    ;(isMobilePlatform as jest.Mock).mockReturnValue(false)
  })

  it('retrieves a server-side cookie using getCookie', () => {
    ;(getCookie as jest.Mock).mockReturnValue(serverCookieValue)

    const result = getToken(accessKeyName)

    expect(result).toBe(serverCookieValue)
    expect(getCookie).toHaveBeenCalledWith(accessKeyName, { noSSR: false })
    expect(getItem).not.toHaveBeenCalled()
  })
})
