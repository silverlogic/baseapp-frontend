import { ComponentWithProviders, renderHook } from '@baseapp-frontend/test'
import { LOGOUT_EVENT, eventEmitter } from '@baseapp-frontend/utils'

import Cookies from 'js-cookie'

import { MFA_API_KEY } from '../../../../services/mfa'
import { USER_API_KEY } from '../../../../services/user'
import useLogout from '../index'

const mockResetQueries = jest.fn()
jest.mock('js-cookie')
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: () => ({
    resetQueries: mockResetQueries,
  }),
}))

describe('useLogout hook', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should remove the cookie and invalidate queries', () => {
    const { result } = renderHook(() => useLogout(), { wrapper: ComponentWithProviders })

    result.current.logout()

    expect(Cookies.remove).toHaveBeenCalled()
    expect(mockResetQueries).toHaveBeenCalledWith(USER_API_KEY.getUser())
    expect(mockResetQueries).toHaveBeenCalledWith(MFA_API_KEY.default)
  })

  test('should call the onLogout callback if provided', async () => {
    const mockOnLogout = jest.fn()
    const { result } = renderHook(() => useLogout({ onLogout: mockOnLogout }), {
      wrapper: ComponentWithProviders,
    })

    result.current.logout()

    expect(mockOnLogout).toHaveBeenCalled()
  })

  it('should emit the logout event if the flag emitLogoutEvent is set to true', () => {
    const emitSpy = jest.spyOn(eventEmitter, 'emit')
    const { result } = renderHook(() => useLogout({ emitLogoutEvent: true }), {
      wrapper: ComponentWithProviders,
    })

    result.current.logout()

    expect(emitSpy).toHaveBeenCalledWith(LOGOUT_EVENT)
  })
})
