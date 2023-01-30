import { renderHook } from '@testing-library/react-hooks'
import { useUser } from '../src/auth'
import Cookies from 'js-cookie'
import { axiosMock, createWrapper } from './utils'
import type { CookiesGetByNameFn } from './utils'
import { user } from './fixtures'

describe('useUser', () => {
  test('should user be null for anonymous', async () => {
    const { result } = renderHook(() => useUser(), { wrapper: createWrapper() })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.user).toBe(null)
  })

  test('should user be present for authenticated', async () => {
    ;(Cookies.get as CookiesGetByNameFn) = jest.fn(() => 'fake token')

    axiosMock.onGet('/users/me').reply(200, user)

    const { result, waitFor } = renderHook(() => useUser(), {
      wrapper: createWrapper(),
    })
    expect(result.current.isLoading).toBe(true)
    
    await waitFor(() => result.current.isSuccess)

    expect(result.current.user?.email).toBe(user.email)
  })

  test('should remove cookie if 401', async () => {
    ;(Cookies.get as CookiesGetByNameFn) = jest.fn(() => 'fake token')
    ;(Cookies.remove as CookiesGetByNameFn) = jest.fn(() => '')

    axiosMock.onGet('/users/me').reply(401, {
      detail: 'Invalid token.',
    })

    const { waitForNextUpdate } = renderHook(() => useUser(), {
      wrapper: createWrapper(),
    })

    await waitForNextUpdate()

    expect(Cookies.remove).toHaveBeenCalled()
  })
})
