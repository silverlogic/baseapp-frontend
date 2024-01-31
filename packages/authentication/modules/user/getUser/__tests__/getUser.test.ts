import { CookiesGetByNameFn } from '@baseapp-frontend/test'

import Cookies from 'js-cookie'

import getUser from '../index'
import jwt from './fixtures/jwt.json'

describe('getUser', () => {
  it('should return the user from the JWT cookie', async () => {
    ;(Cookies.get as CookiesGetByNameFn) = jest.fn(() => jwt.token)
    const user = await getUser()

    expect(user?.email).toBe('user@company.com')
    expect(user?.firstName).toBe('John')
    expect(user?.lastName).toBe('Doe')
  })

  it('should return null if the JWT cookie is not set', async () => {
    ;(Cookies.get as CookiesGetByNameFn) = jest.fn(() => undefined)
    const user = await getUser()

    expect(user).toBeNull()
  })
})
