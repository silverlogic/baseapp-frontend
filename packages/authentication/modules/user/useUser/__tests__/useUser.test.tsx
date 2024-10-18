import { type CookiesGetByNameFn, renderHook } from '@baseapp-frontend/test'

import Cookies from 'js-cookie'

import useUser from '../index'
import jwt from './fixtures/jwt.json'

describe('useUser', () => {
  test('should return the user from the JWT cookie', () => {
    ;(Cookies.get as CookiesGetByNameFn) = jest.fn(() => jwt.token)
    const { result } = renderHook(() => useUser())

    expect(result.current?.email).toBe('user@company.com')
    expect(result.current?.firstName).toBe('John')
    expect(result.current?.lastName).toBe('Doe')
  })
})
