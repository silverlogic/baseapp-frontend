import { ComponentWithProviders, renderHook } from '@baseapp-frontend/test'

import { MFA_API_KEY } from '../../../../services/mfa'
import { USER_API_KEY } from '../../../../services/user'
import { withAuthenticationTestProviders } from '../../../tests/utils'
import useLogout from '../index'

const mockStrategyLogout = jest.fn().mockResolvedValue(undefined)
const mockClear = jest.fn().mockResolvedValue(undefined)
const mockResetQueries = jest.fn()
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: () => ({
    resetQueries: mockResetQueries,
  }),
}))
jest.mock('../../../../session/client', () => ({
  getSessionService: () => ({
    clear: mockClear,
  }),
}))
jest.mock('../../../auth-strategy/factory', () => ({
  getActiveAuthModule: () => ({
    strategy: { logout: mockStrategyLogout },
  }),
}))

describe('useLogout hook', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should call strategy logout and clear session', async () => {
    const { result } = renderHook(() => useLogout(), { wrapper: ComponentWithProviders })

    await result.current.logout()

    expect(mockStrategyLogout).toHaveBeenCalled()
    expect(mockClear).toHaveBeenCalledWith('logout')
    expect(mockResetQueries).toHaveBeenCalledWith({ queryKey: USER_API_KEY.getUser() })
    expect(mockResetQueries).toHaveBeenCalledWith({ queryKey: MFA_API_KEY.default })
  })

  test('should clear session even if strategy logout fails', async () => {
    mockStrategyLogout.mockRejectedValueOnce(new Error('network failure'))
    const { result } = renderHook(() => useLogout(), { wrapper: ComponentWithProviders })

    await result.current.logout()

    expect(mockStrategyLogout).toHaveBeenCalled()
    expect(mockClear).toHaveBeenCalledWith('logout')
  })

  test('should call the onLogout callback if provided', async () => {
    const mockOnLogout = jest.fn()
    const { result } = renderHook(() => useLogout({ onLogout: mockOnLogout }), {
      wrapper: withAuthenticationTestProviders(ComponentWithProviders),
    })

    await result.current.logout()

    expect(mockOnLogout).toHaveBeenCalled()
  })

  test('should clear session with logout reason when emitLogoutEvent is true', async () => {
    const { result } = renderHook(() => useLogout({ emitLogoutEvent: true }), {
      wrapper: withAuthenticationTestProviders(ComponentWithProviders),
    })

    await result.current.logout()

    expect(mockClear).toHaveBeenCalledWith('logout')
  })

  test('should clear session without an event reason when emitLogoutEvent is set to false', async () => {
    const { result } = renderHook(() => useLogout({ emitLogoutEvent: false }), {
      wrapper: withAuthenticationTestProviders(ComponentWithProviders),
    })

    await result.current.logout()

    expect(mockClear).toHaveBeenCalledWith(undefined)
  })
})
