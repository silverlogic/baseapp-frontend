import { act, render, waitFor } from '@baseapp-frontend/test'
import { LOGOUT_EVENT, eventEmitter, removeCookie } from '@baseapp-frontend/utils'

import { CURRENT_PROFILE_KEY } from '../constants'
import { mockUserProfileFactory } from './__mock__/profiles'
import TestComponentWithProviders from './__utils__/TestComponentWithProvider'

jest.mock('@baseapp-frontend/utils', () => ({
  ...jest.requireActual('@baseapp-frontend/utils'),
  removeCookie: jest.fn(),
}))

describe('CurrentProfileProvider', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it.only('should erase current profile when user logs out', async () => {
    const profile = mockUserProfileFactory('user-profile-1')
    render(<TestComponentWithProviders initialProfile={profile} />)

    await waitFor(() => {
      expect(document.getElementById('profile-id')).not.toBeNull()
    })

    act(() => {
      eventEmitter.emit(LOGOUT_EVENT)
    })

    await waitFor(() => {
      expect(document.getElementById('profile-id')).toBeNull()
    })
    expect(removeCookie).toHaveBeenCalledWith(CURRENT_PROFILE_KEY)
  })
})
