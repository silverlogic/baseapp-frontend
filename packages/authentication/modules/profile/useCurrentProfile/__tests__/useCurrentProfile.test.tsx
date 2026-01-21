import React from 'react'

import { act, renderHook } from '@baseapp-frontend/test'
import { CookieProvider } from '@baseapp-frontend/utils'
import { CURRENT_PROFILE_KEY_NAME } from '@baseapp-frontend/utils/constants/profile'

import Cookies from 'js-cookie'

import { CurrentProfileProvider } from '..'
import useCurrentProfile from '..'
import { MISSING_PROFILE_STORE_ERROR } from '../constants'
import {
  getCurrentProfileFromStore,
  resetProfileStore,
  setCurrentProfileInStore,
  updateProfileIfActiveInStore,
} from '../store'
import { mockUserProfileFactory } from './__mock__/profiles'

jest.mock('js-cookie', () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}))

const mockedCookies = Cookies as jest.Mocked<typeof Cookies>

describe('useCurrentProfile', () => {
  const renderWithProviders = (initialCookies = {}) => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CookieProvider initialCookies={initialCookies}>
        <CurrentProfileProvider>{children}</CurrentProfileProvider>
      </CookieProvider>
    )
    return renderHook(() => useCurrentProfile(), { wrapper })
  }

  beforeEach(() => {
    jest.clearAllMocks()
    resetProfileStore()
  })

  afterEach(() => {
    jest.clearAllMocks()
    resetProfileStore()
  })

  describe('initialization', () => {
    it('initializes with null profile when no initial profile provided', () => {
      const { result } = renderWithProviders()

      expect(result.current.currentProfile).toBeNull()
    })

    it('initializes with provided initial profile', () => {
      const initialProfile = mockUserProfileFactory('initial-profile')
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <CookieProvider>
          <CurrentProfileProvider initialCurrentProfile={initialProfile}>
            {children}
          </CurrentProfileProvider>
        </CookieProvider>
      )
      const { result } = renderHook(() => useCurrentProfile(), { wrapper })

      expect(result.current.currentProfile).toEqual(initialProfile)
    })
  })

  describe('profile state management', () => {
    it('changes current profile state and sets cookie', () => {
      const profile1 = mockUserProfileFactory('profile-id-1')
      const profile2 = mockUserProfileFactory('profile-id-2')
      const { result } = renderWithProviders()

      act(() => result.current.setCurrentProfile(profile1))
      expect(result.current.currentProfile).toEqual(profile1)
      expect(mockedCookies.set).toHaveBeenCalledWith(
        CURRENT_PROFILE_KEY_NAME,
        JSON.stringify(profile1),
      )

      act(() => result.current.setCurrentProfile(profile2))
      expect(result.current.currentProfile).toEqual(profile2)
      expect(mockedCookies.set).toHaveBeenCalledWith(
        CURRENT_PROFILE_KEY_NAME,
        JSON.stringify(profile2),
      )
    })

    it('sets cookie even when profile is set to null', () => {
      const profile = mockUserProfileFactory('profile-id')
      const { result } = renderWithProviders()

      act(() => result.current.setCurrentProfile(profile))
      expect(result.current.currentProfile).toEqual(profile)

      act(() => result.current.setCurrentProfile(null))
      expect(result.current.currentProfile).toBeNull()
      expect(mockedCookies.set).toHaveBeenCalledWith(CURRENT_PROFILE_KEY_NAME, JSON.stringify(null))
    })
  })

  describe('updateProfileIfActive functionality', () => {
    it('updates profile if active user matches', () => {
      const originalProfile = mockUserProfileFactory('user-1')
      const updatedProfile = { ...originalProfile, name: 'Updated Name' }
      const { result } = renderWithProviders()

      act(() => result.current.setCurrentProfile(originalProfile))
      expect(result.current.currentProfile).toEqual(originalProfile)

      act(() => result.current.updateProfileIfActive(updatedProfile))
      expect(result.current.currentProfile).toEqual(updatedProfile)
      expect(mockedCookies.set).toHaveBeenCalledWith(
        CURRENT_PROFILE_KEY_NAME,
        JSON.stringify(updatedProfile),
      )
    })

    it('does not update profile if different user', () => {
      const profile1 = mockUserProfileFactory('user-1')
      const profile2 = mockUserProfileFactory('user-2')
      const { result } = renderWithProviders()

      act(() => result.current.setCurrentProfile(profile1))
      expect(result.current.currentProfile).toEqual(profile1)

      act(() => result.current.updateProfileIfActive(profile2))
      expect(result.current.currentProfile).toEqual(profile1) // Should remain unchanged
    })

    it('does not update profile if no current profile exists', () => {
      const profile = mockUserProfileFactory('user-1')
      const { result } = renderWithProviders()

      expect(result.current.currentProfile).toBeNull()

      act(() => result.current.updateProfileIfActive(profile))
      expect(result.current.currentProfile).toBeNull()
    })
  })

  describe('store helper functions', () => {
    it('getCurrentProfileFromStore returns current profile', () => {
      const profile = mockUserProfileFactory('helper-test-1')
      const { result } = renderWithProviders()

      expect(getCurrentProfileFromStore()).toBeNull()

      act(() => result.current.setCurrentProfile(profile))
      expect(getCurrentProfileFromStore()).toEqual(profile)
    })

    it('setCurrentProfileInStore updates profile state', () => {
      const profile = mockUserProfileFactory('helper-test-2')
      const { result } = renderWithProviders()

      act(() => setCurrentProfileInStore(profile))
      expect(result.current.currentProfile).toEqual(profile)
      expect(getCurrentProfileFromStore()).toEqual(profile)
      expect(mockedCookies.set).toHaveBeenCalledWith(
        CURRENT_PROFILE_KEY_NAME,
        JSON.stringify(profile),
      )
    })

    it('updateProfileIfActiveInStore updates when profile matches', () => {
      const originalProfile = mockUserProfileFactory('helper-test-3')
      const updatedProfile = { ...originalProfile, name: 'Updated via helper' }
      const { result } = renderWithProviders()

      act(() => result.current.setCurrentProfile(originalProfile))

      act(() => updateProfileIfActiveInStore(updatedProfile))
      expect(result.current.currentProfile).toEqual(updatedProfile)
      expect(getCurrentProfileFromStore()).toEqual(updatedProfile)
    })

    it('updateProfileIfActiveInStore does not update when profile does not match', () => {
      const profile1 = mockUserProfileFactory('helper-test-4')
      const profile2 = mockUserProfileFactory('helper-test-5')
      const { result } = renderWithProviders()

      act(() => result.current.setCurrentProfile(profile1))

      act(() => updateProfileIfActiveInStore(profile2))
      expect(result.current.currentProfile).toEqual(profile1) // Should remain unchanged
      expect(getCurrentProfileFromStore()).toEqual(profile1)
    })

    it('helper functions throw error when used without CurrentProfileProvider context', () => {
      const profile = mockUserProfileFactory('no-context-test')

      expect(() => getCurrentProfileFromStore()).toThrow(MISSING_PROFILE_STORE_ERROR)

      expect(() => setCurrentProfileInStore(profile)).toThrow(MISSING_PROFILE_STORE_ERROR)

      expect(() => updateProfileIfActiveInStore(profile)).toThrow(MISSING_PROFILE_STORE_ERROR)
    })

    it('hook throws error when used without CurrentProfileProvider context', () => {
      expect(() => {
        renderHook(() => useCurrentProfile())
      }).toThrow(MISSING_PROFILE_STORE_ERROR)
    })
  })
})
