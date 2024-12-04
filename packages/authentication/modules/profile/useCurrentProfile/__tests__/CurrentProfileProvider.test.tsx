import { act, render, waitFor } from '@baseapp-frontend/test'
import { LOGOUT_EVENT, eventEmitter, getCookie, setCookie } from '@baseapp-frontend/utils'

import { MinimalProfile } from '../../../../types/profile'
import { CURRENT_PROFILE_KEY } from '../constants'
import { mockUserProfileFactory } from './__mock__/profiles'
import TestComponentWithProviders from './__utils__/TestComponentWithProvider'

describe('CurrentProfileProvider', () => {
  const setProfileCookie = (profile: MinimalProfile) => {
    console.log(profile)
    setCookie(CURRENT_PROFILE_KEY, profile, { stringfyValue: true })
  }

  it('should erase current profile when user logs out', async () => {
    const profile = mockUserProfileFactory('user-profile-1')
    setProfileCookie(profile)
    console.log('Y')
    console.log(document.cookie)
    console.log('X')
    console.log(getCookie(CURRENT_PROFILE_KEY, { parseJSON: true, noSSR: true }))
    console.log(getCookie(CURRENT_PROFILE_KEY, { parseJSON: true }))

    render(<TestComponentWithProviders initialProfile={profile} />)

    console.log(getCookie(CURRENT_PROFILE_KEY, { parseJSON: true }))

    await waitFor(() => {
      expect(getCookie(CURRENT_PROFILE_KEY, { parseJSON: true })).toEqual(undefined)
      expect(document.getElementById('profile-id')).not.toBeNull()
    })

    act(() => {
      eventEmitter.emit(LOGOUT_EVENT)
    })

    await waitFor(() => {
      expect(getCookie(CURRENT_PROFILE_KEY, { parseJSON: true })).toEqual(undefined)
      expect(document.getElementById('profile-id')).toBeNull()
    })
  })
})
