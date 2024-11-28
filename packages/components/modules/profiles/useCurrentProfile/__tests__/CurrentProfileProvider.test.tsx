import { createTestEnvironment } from '@baseapp-frontend/graphql'
import { act, render, waitFor } from '@baseapp-frontend/test'
import { MinimalProfile } from '@baseapp-frontend/utils'
import { LOGOUT_EVENT, eventEmitter, getCookie, setCookie } from '@baseapp-frontend/utils'

import { CURRENT_PROFILE_KEY } from '../constants'
import { mockUserProfileFactory } from './__mock__/profiles'
import { userMockData, userMockData2 } from './__mock__/user'
import { useAndInitializeCurrentProfile } from './__utils__/useAndInitializeCurrentProfile'

describe('CurrentProfileProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  const loadPreStoredData = (profile: MinimalProfile) => {
    setCookie(CURRENT_PROFILE_KEY, profile, { stringfyValue: true })
  }

  it.only('should get the user from local storage and not trigger the user profile fetch', async () => {
    const { environment } = createTestEnvironment()

    const profile1 = mockUserProfileFactory('user-profile-1')
    useAndInitializeCurrentProfile(profile1)
    loadPreStoredData(profile1)

    const TestComponentWithProviders = require('./__utils__/TestComponentWithProvider').default
    const { getByText } = render(<TestComponentWithProviders environment={environment} />)

    await waitFor(() => {
      expect(getByText(profile1.id)).toBeInTheDocument()
    })
  })

  it('should erase current profile when user logs out', async () => {
    const { environment } = createTestEnvironment()

    const profile2 = mockUserProfileFactory('user-profile-1')
    loadPreStoredData(profile2)

    const TestComponentWithProviders = require('./__utils__/TestComponentWithProvider').default
    render(<TestComponentWithProviders environment={environment} />)

    act(() => {
      eventEmitter.emit(LOGOUT_EVENT)
    })

    await waitFor(() => {
      expect(getCookie(CURRENT_PROFILE_KEY, { parseJSON: true })).toEqual(undefined)

      expect(document.getElementById('profile-id')).toBeNull()
    })
  })
})
