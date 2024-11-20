import { createTestEnvironment } from '@baseapp-frontend/graphql'
import { act, render, waitFor } from '@baseapp-frontend/test'
import { LOGOUT_EVENT, eventEmitter } from '@baseapp-frontend/utils'

import { ProfileItemFragment$data } from '../../../../__generated__/ProfileItemFragment.graphql'
import { CURRENT_PROFILE_STORAGE_KEY } from '../constants'
import { CurrentProfileState } from '../types'
import { mockUserProfileFactory } from './__mock__/profiles'
import { userMockData, userMockData2 } from './__mock__/user'
import TestComponentWithProviders from './__utils__/TestComponentWithProvider'

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

  const loadPreStoredData = (customUserMockData: any, customUserProfileMockData: any) => {
    const storedCurrentProfile: CurrentProfileState = {
      profile: customUserProfileMockData.data.me.profile as ProfileItemFragment$data,
      userId: customUserMockData.id,
    }

    localStorage.setItem(
      CURRENT_PROFILE_STORAGE_KEY,
      JSON.stringify({ state: storedCurrentProfile, version: 0 }),
    )
  }

  it('should get the user from local storage and not trigger the user profile fetch', async () => {
    const { environment } = createTestEnvironment()

    const newUserProfileMockData = mockUserProfileFactory('user-profile-1')
    loadPreStoredData(userMockData, newUserProfileMockData)

    const { getByText } = render(<TestComponentWithProviders environment={environment} />)

    await waitFor(() => {
      expect(getByText(newUserProfileMockData.data.me.profile.id)).toBeInTheDocument()
    })
  })

  it("should not use another user's current profile as the current profile", async () => {
    const { environment, resolveMostRecentOperation } = createTestEnvironment()

    const diffUserProfileMockData = mockUserProfileFactory('user-profile-2')
    loadPreStoredData(userMockData2, diffUserProfileMockData)

    const newUserProfileMockData = mockUserProfileFactory('user-profile-1')

    const { getByText } = render(<TestComponentWithProviders environment={environment} />)

    act(() => {
      resolveMostRecentOperation({
        data: newUserProfileMockData,
      })
    })

    await waitFor(() => {
      expect(getByText(newUserProfileMockData.data.me.profile.id)).toBeInTheDocument()
    })
  })

  it('should erase current profile when user logs out', async () => {
    const { environment } = createTestEnvironment()

    const newUserProfileMockData = mockUserProfileFactory('user-profile-2')
    loadPreStoredData(userMockData, newUserProfileMockData)

    render(<TestComponentWithProviders environment={environment} />)

    act(() => {
      eventEmitter.emit(LOGOUT_EVENT)
    })

    await waitFor(() => {
      const storedData = JSON.parse(localStorage.getItem(CURRENT_PROFILE_STORAGE_KEY) || '{}')
      expect(storedData.state).toEqual({})

      expect(document.getElementById('profile-id')).toBeNull()
    })
  })

  it('should keep the current profile empty when it fails to fetch the profile', async () => {
    const { environment, rejectMostRecentOperation } = createTestEnvironment()

    render(<TestComponentWithProviders environment={environment} />)

    act(() => {
      rejectMostRecentOperation('Profile not found')
    })

    await waitFor(() => {
      const storedData = JSON.parse(localStorage.getItem(CURRENT_PROFILE_STORAGE_KEY) || '{}')
      expect(storedData.state).toEqual({})

      expect(document.getElementById('profile-id')).toBeNull()
    })
  })
})
