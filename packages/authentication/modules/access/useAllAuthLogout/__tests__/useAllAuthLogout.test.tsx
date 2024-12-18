// TODO: Update for allAuth

// import { ComponentWithProviders, renderHook } from '@baseapp-frontend/test'
// import {
//   ACCESS_KEY_NAME,
//   LOGOUT_EVENT,
//   REFRESH_KEY_NAME,
//   eventEmitter,
//   removeTokenAsync,
// } from '@baseapp-frontend/utils'

// import { MFA_API_KEY } from '../../../../services/mfa'
// import { USER_API_KEY } from '../../../../services/user'
// import useLogout from '../index'

// const mockResetQueries = jest.fn()
// jest.mock('@tanstack/react-query', () => ({
//   ...jest.requireActual('@tanstack/react-query'),
//   useQueryClient: () => ({
//     resetQueries: mockResetQueries,
//   }),
// }))
// jest.mock('@baseapp-frontend/utils', () => ({
//   ...jest.requireActual('@baseapp-frontend/utils'),
//   removeTokenAsync: jest.fn(),
// }))

// describe('useLogout hook', () => {
//   afterEach(() => {
//     jest.clearAllMocks()
//   })

//   test('should remove tokens and invalidate queries', async () => {
//     const { result } = renderHook(() => useLogout(), { wrapper: ComponentWithProviders })

//     await result.current.logout()

//     expect(removeTokenAsync).toHaveBeenCalledWith(ACCESS_KEY_NAME)
//     expect(removeTokenAsync).toHaveBeenCalledWith(REFRESH_KEY_NAME)
//     expect(mockResetQueries).toHaveBeenCalledWith({ queryKey: USER_API_KEY.getUser() })
//     expect(mockResetQueries).toHaveBeenCalledWith({ queryKey: MFA_API_KEY.default })
//   })

//   test('should call the onLogout callback if provided', async () => {
//     const mockOnLogout = jest.fn()
//     const { result } = renderHook(() => useLogout({ onLogout: mockOnLogout }), {
//       wrapper: ComponentWithProviders,
//     })

//     await result.current.logout()

//     expect(mockOnLogout).toHaveBeenCalled()
//   })

//   test('should emit the logout event if the flag emitLogoutEvent is set to true', async () => {
//     const emitSpy = jest.spyOn(eventEmitter, 'emit')
//     const { result } = renderHook(() => useLogout({ emitLogoutEvent: true }), {
//       wrapper: ComponentWithProviders,
//     })

//     await result.current.logout()

//     expect(emitSpy).toHaveBeenCalledWith(LOGOUT_EVENT)
//   })

//   test('should not emit the logout event if emitLogoutEvent is set to false', async () => {
//     const emitSpy = jest.spyOn(eventEmitter, 'emit')
//     const { result } = renderHook(() => useLogout({ emitLogoutEvent: false }), {
//       wrapper: ComponentWithProviders,
//     })

//     await result.current.logout()

//     expect(emitSpy).not.toHaveBeenCalled()
//   })
// })
