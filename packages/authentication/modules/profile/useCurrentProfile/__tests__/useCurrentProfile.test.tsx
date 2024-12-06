import { act, renderHook } from '@baseapp-frontend/test'
import { LOGOUT_EVENT, eventEmitter, removeCookie, setCookie } from '@baseapp-frontend/utils'

import useCurrentProfile from '..'
import { CURRENT_PROFILE_KEY } from '../constants'
import { mockUserProfileFactory } from './__mock__/profiles'

jest.mock('@baseapp-frontend/utils', () => ({
  ...jest.requireActual('@baseapp-frontend/utils'),
  removeCookie: jest.fn(),
  setCookie: jest.fn(),
}))

describe('useCurrentProfile', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('changes current profile state and sets cookie', () => {
    const profile1 = mockUserProfileFactory('profile-id-1')
    const profile2 = mockUserProfileFactory('profile-id-2')
    const { result } = renderHook(() => useCurrentProfile())

    act(() => result.current.setCurrentProfile(profile1))
    expect(result.current.currentProfile!.id).toEqual('profile-id-1')
    expect(setCookie).toHaveBeenCalledWith(CURRENT_PROFILE_KEY, profile1, { stringfyValue: true })

    act(() => result.current.setCurrentProfile(profile2))
    expect(result.current.currentProfile!.id).toEqual('profile-id-2')
    expect(setCookie).toHaveBeenCalledWith(CURRENT_PROFILE_KEY, profile1, { stringfyValue: true })
  })

  it('erases current profile when user logs out', async () => {
    const profile = mockUserProfileFactory('user-profile-1')
    const { result } = renderHook(() => useCurrentProfile())
    act(() => result.current.setCurrentProfile(profile))

    act(() => eventEmitter.emit(LOGOUT_EVENT))
    expect(result.current.currentProfile).toEqual(null)
    expect(removeCookie).toHaveBeenCalledWith(CURRENT_PROFILE_KEY)
  })
})
