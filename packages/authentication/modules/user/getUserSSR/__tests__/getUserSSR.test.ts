import { getTokenSSR } from '@baseapp-frontend/utils/functions/token/getTokenSSR'

import getUserSSR from '../index'
import jwt from './fixtures/jwt.json'

vi.mock('@baseapp-frontend/utils/functions/token/getTokenSSR', () => ({
  getTokenSSR: vi.fn(),
}))

describe('getUserSSR', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return the user from the JWT token', async () => {
    ;(getTokenSSR as Mock).mockResolvedValue(jwt.token)
    const user = await getUserSSR()
    expect(user?.email).toBe('user@company.com')
    expect(user?.firstName).toBe('John')
    expect(user?.lastName).toBe('Doe')
    expect(user?.id).toBe(1)
    expect(getTokenSSR).toHaveBeenCalledTimes(1)
  })

  it('should return null if no token is set', async () => {
    ;(getTokenSSR as Mock).mockResolvedValue(undefined)
    const user = await getUserSSR()
    expect(user).toBeNull()
    expect(getTokenSSR).toHaveBeenCalledTimes(1)
  })

  it('should return null when token is invalid/malformed', async () => {
    ;(getTokenSSR as Mock).mockResolvedValue('invalid.jwt.token')
    const user = await getUserSSR()
    expect(user).toBeNull()
    expect(getTokenSSR).toHaveBeenCalledTimes(1)
  })

  it('should use custom accessKeyName when provided', async () => {
    const customKey = 'custom-access-key'
    ;(getTokenSSR as Mock).mockResolvedValue(jwt.token)

    const user = await getUserSSR({ accessKeyName: customKey })

    expect(user?.email).toBe('user@company.com')
    expect(getTokenSSR).toHaveBeenCalledWith(customKey)
  })

  it('should return null when token exists but is empty string', async () => {
    ;(getTokenSSR as Mock).mockResolvedValue('')
    const user = await getUserSSR()
    expect(user).toBeNull()
  })

  it('should return null when token exists but is null', async () => {
    ;(getTokenSSR as Mock).mockResolvedValue(null)
    const user = await getUserSSR()
    expect(user).toBeNull()
  })
})
