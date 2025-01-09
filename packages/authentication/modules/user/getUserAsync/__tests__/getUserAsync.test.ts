import { getTokenAsync } from '@baseapp-frontend/utils/functions/token/getTokenAsync'

import getUserAsync from '../index'
import jwt from './fixtures/jwt.json'

jest.mock('@baseapp-frontend/utils/functions/token/getTokenAsync', () => ({
  getTokenAsync: jest.fn(),
}))

describe('getUserAsync', () => {
  it('should return the user from the JWT token', async () => {
    ;(getTokenAsync as jest.Mock).mockReturnValue(jwt.token)

    const user = await getUserAsync()

    expect(user?.email).toBe('user@company.com')
    expect(user?.firstName).toBe('John')
    expect(user?.lastName).toBe('Doe')
  })

  it('should return null if no token is set', async () => {
    ;(getTokenAsync as jest.Mock).mockReturnValue(undefined)

    const user = await getUserAsync()

    expect(user).toBeNull()
  })
})
