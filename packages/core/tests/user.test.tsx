import { renderHook, act } from '@testing-library/react-hooks'
import { useUser } from '../src/auth'
import Cookies from 'js-cookie'
import { axiosMock, createWrapper } from './utils'
import type { CookiesGetByNameFn } from './utils'

describe('useUser', () => {
  test('should user be null for anonymous', async () => {
    const { result } = renderHook(() => useUser(), { wrapper: createWrapper() })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.user).toBe(null)
  })

  test('should user be present for authenticated', async () => {
    ;(Cookies.get as CookiesGetByNameFn) = jest.fn(() => 'fake token')

    axiosMock.onGet('/users/me').reply(200, {
      email: 'ap@tsl.io',
      id: 1,
      firstName: 'Alisson',
      lastName: 'Patricio',
      isEmailVerified: true,
      isNewEmailConfirmed: false,
      newEmail: '',
      referralCode: '1234',
    })

    const { result, waitFor, waitForNextUpdate } = renderHook(() => useUser(), {
      wrapper: createWrapper(),
    })
    expect(result.current.isLoading).toBe(true)

    await waitFor(() => result.current.isSuccess)

    expect(result.current.user?.email).toBe('ap@tsl.io')
  })

  test('should remove cookie if 401', async () => {
    ;(Cookies.get as CookiesGetByNameFn) = jest.fn(() => 'fake token')
    ;(Cookies.remove as CookiesGetByNameFn) = jest.fn(() => '')

    axiosMock.onGet('/users/me').reply(401, {
      detail: 'Invalid token.',
    })

    const { result, waitFor, waitForNextUpdate } = renderHook(() => useUser(), {
      wrapper: createWrapper(),
    })

    await waitForNextUpdate()

    expect(Cookies.remove).toHaveBeenCalled()
  })
})
