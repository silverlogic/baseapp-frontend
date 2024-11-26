import { MinimalProfile } from '@baseapp-frontend/authentication'
import { createTestEnvironment } from '@baseapp-frontend/graphql'
import { act, render, waitFor } from '@baseapp-frontend/test'
import { LOGOUT_EVENT, eventEmitter, getCookie, setCookie } from '@baseapp-frontend/utils'

import { PROFILE_KEY } from '../constants'
import { mockUserProfileFactory } from './__mock__/profiles'
import { userMockData, userMockData2 } from './__mock__/user'

jest.mock('@baseapp-frontend/authentication', () => ({
  useJWTUser: jest.fn(),
}))

describe('CurrentProfileProvider', () => {
  const { useJWTUser } = require('@baseapp-frontend/authentication')

  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()

    useJWTUser.mockReturnValue({
      user: userMockData,
    })
  })

  const loadPreStoredData = (customUserProfileMockData: any) => {
    const profile = customUserProfileMockData.data.me.profile as MinimalProfile

    setCookie(PROFILE_KEY, profile, { stringfyValue: true })
  }

  it('should get the user from local storage and not trigger the user profile fetch', async () => {
    const { environment } = createTestEnvironment()

    const newUserProfileMockData = mockUserProfileFactory('user-profile-1')
    loadPreStoredData(newUserProfileMockData)

    const TestComponentWithProviders = require('./__utils__/TestComponentWithProvider').default
    const { getByText } = render(<TestComponentWithProviders environment={environment} />)

    await waitFor(() => {
      expect(getByText(newUserProfileMockData.data.me.profile.id)).toBeInTheDocument()
    })
  })

  it('should erase current profile when user logs out', async () => {
    const { environment } = createTestEnvironment()

    const newUserProfileMockData = mockUserProfileFactory('user-profile-1')
    loadPreStoredData(newUserProfileMockData)

    const TestComponentWithProviders = require('./__utils__/TestComponentWithProvider').default
    render(<TestComponentWithProviders environment={environment} />)

    act(() => {
      eventEmitter.emit(LOGOUT_EVENT)
    })

    await waitFor(() => {
      expect(getCookie(PROFILE_KEY, { parseJSON: true })).toEqual(undefined)

      expect(document.getElementById('profile-id')).toBeNull()
    })
  })
})
