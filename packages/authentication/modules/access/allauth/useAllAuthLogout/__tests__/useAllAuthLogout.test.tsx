import { ComponentWithProviders, mockFetch, renderHook } from '@baseapp-frontend/test'
import {
  ACCESS_KEY_NAME,
  LOGOUT_EVENT,
  REFRESH_KEY_NAME,
  eventEmitter,
  getToken,
  removeTokenAsync,
} from '@baseapp-frontend/utils'
import { CURRENT_PROFILE_KEY_NAME } from '@baseapp-frontend/utils/constants/profile'

import { MFA_API_KEY } from '../../../../../services/mfa'
import { USER_API_KEY } from '../../../../../services/user'
import { withAuthenticationTestProviders } from '../../../../tests/utils'
import useAllAuthLogout from '../index'

const mockResetQueries = jest.fn()
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: () => ({
    resetQueries: mockResetQueries,
  }),
}))
jest.mock('@baseapp-frontend/utils', () => ({
  ...jest.requireActual('@baseapp-frontend/utils'),
  getToken: jest.fn(() => 'fake-refresh-token'),
  removeTokenAsync: jest.fn(),
}))

describe('useAllAuthLogout', () => {
  const logoutUrl = '/_allauth/app/v1/auth/session'

  afterEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock).mockClear()
  })

  test('should call AllAuth logout endpoint and clear local state', async () => {
    mockFetch(logoutUrl, {
      method: 'DELETE',
      status: 200,
      response: {},
    })

    const { result } = renderHook(() => useAllAuthLogout(), {
      wrapper: withAuthenticationTestProviders(ComponentWithProviders),
    })

    await result.current.logout()

    expect(removeTokenAsync).toHaveBeenCalledWith(ACCESS_KEY_NAME)
    expect(removeTokenAsync).toHaveBeenCalledWith(REFRESH_KEY_NAME)
    expect(removeTokenAsync).toHaveBeenCalledWith(CURRENT_PROFILE_KEY_NAME)
    expect(mockResetQueries).toHaveBeenCalledWith({ queryKey: USER_API_KEY.getUser() })
    expect(mockResetQueries).toHaveBeenCalledWith({ queryKey: MFA_API_KEY.default })
  })

  test('should clear local state even if logout API call fails', async () => {
    mockFetch(logoutUrl, {
      method: 'DELETE',
      status: 500,
      response: { error: 'Server error' },
    })

    const { result } = renderHook(() => useAllAuthLogout(), {
      wrapper: withAuthenticationTestProviders(ComponentWithProviders),
    })

    await result.current.logout()

    // Should still clear local state even if API fails
    expect(removeTokenAsync).toHaveBeenCalledWith(ACCESS_KEY_NAME)
    expect(removeTokenAsync).toHaveBeenCalledWith(REFRESH_KEY_NAME)
    expect(removeTokenAsync).toHaveBeenCalledWith(CURRENT_PROFILE_KEY_NAME)
  })

  test('should call the onLogout callback if provided', async () => {
    mockFetch(logoutUrl, {
      method: 'DELETE',
      status: 200,
      response: {},
    })

    const mockOnLogout = jest.fn()
    const { result } = renderHook(() => useAllAuthLogout({ onLogout: mockOnLogout }), {
      wrapper: withAuthenticationTestProviders(ComponentWithProviders),
    })

    await result.current.logout()

    expect(mockOnLogout).toHaveBeenCalled()
  })

  test('should emit the logout event if the flag emitLogoutEvent is set to true', async () => {
    mockFetch(logoutUrl, {
      method: 'DELETE',
      status: 200,
      response: {},
    })

    const emitSpy = jest.spyOn(eventEmitter, 'emit')
    const { result } = renderHook(() => useAllAuthLogout({ emitLogoutEvent: true }), {
      wrapper: withAuthenticationTestProviders(ComponentWithProviders),
    })

    await result.current.logout()

    expect(emitSpy).toHaveBeenCalledWith(LOGOUT_EVENT)
  })

  test('should not emit the logout event if the flag emitLogoutEvent is set to false', async () => {
    mockFetch(logoutUrl, {
      method: 'DELETE',
      status: 200,
      response: {},
    })

    const emitSpy = jest.spyOn(eventEmitter, 'emit')
    const { result } = renderHook(() => useAllAuthLogout({ emitLogoutEvent: false }), {
      wrapper: withAuthenticationTestProviders(ComponentWithProviders),
    })

    await result.current.logout()

    expect(emitSpy).not.toHaveBeenCalled()
  })
})
