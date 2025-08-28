import { getTokenSSR } from '@baseapp-frontend/utils/functions/token/getTokenSSR'

import getUserSSR from '../index'
import jwt from './fixtures/jwt.json'

jest.mock('@baseapp-frontend/utils/functions/token/getTokenSSR', () => ({
  getTokenSSR: jest.fn(),
}))

describe('getUserSSR', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return the user from the JWT token', async () => {
    ;(getTokenSSR as jest.Mock).mockResolvedValue(jwt.token)
    const user = await getUserSSR()
    expect(user?.email).toBe('user@company.com')
    expect(user?.firstName).toBe('John')
    expect(user?.lastName).toBe('Doe')
    expect(user?.id).toBe(1)
    expect(getTokenSSR).toHaveBeenCalledTimes(1)
  })

  it('should return null if no token is set', async () => {
    ;(getTokenSSR as jest.Mock).mockResolvedValue(undefined)
    const user = await getUserSSR()
    expect(user).toBeNull()
    expect(getTokenSSR).toHaveBeenCalledTimes(1)
  })

  it('should return null when token is invalid/malformed', async () => {
    ;(getTokenSSR as jest.Mock).mockResolvedValue('invalid.jwt.token')
    const user = await getUserSSR()
    expect(user).toBeNull()
    expect(getTokenSSR).toHaveBeenCalledTimes(1)
  })

  it('should use custom accessKeyName when provided', async () => {
    const customKey = 'custom-access-key'
    ;(getTokenSSR as jest.Mock).mockResolvedValue(jwt.token)

    const user = await getUserSSR({ accessKeyName: customKey })

    expect(user?.email).toBe('user@company.com')
    expect(getTokenSSR).toHaveBeenCalledWith(customKey)
  })

  it('should return null when token exists but is empty string', async () => {
    ;(getTokenSSR as jest.Mock).mockResolvedValue('')
    const user = await getUserSSR()
    expect(user).toBeNull()
  })

  it('should return null when token exists but is null', async () => {
    ;(getTokenSSR as jest.Mock).mockResolvedValue(null)
    const user = await getUserSSR()
    expect(user).toBeNull()
  })
})
