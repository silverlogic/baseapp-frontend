import { getToken } from '@baseapp-frontend/utils/functions/token/getToken'

import getUser from '../index'
import jwt from './fixtures/jwt.json'

jest.mock('@baseapp-frontend/utils/functions/token/getToken', () => ({
  getToken: jest.fn(),
}))

describe('getUser', () => {
  it('should return the user from the JWT token', () => {
    ;(getToken as jest.Mock).mockReturnValue(jwt.token)
    const user = getUser()
    expect(user?.email).toBe('user@company.com')
    expect(user?.firstName).toBe('John')
    expect(user?.lastName).toBe('Doe')
  })

  it('should return null if no token is set', () => {
    ;(getToken as jest.Mock).mockReturnValue(undefined)
    const user = getUser()
    expect(user).toBeNull()
  })
})
