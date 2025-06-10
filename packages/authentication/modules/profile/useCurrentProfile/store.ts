import Cookies from 'js-cookie'
import { type StoreApi, createStore } from 'zustand'

import { MinimalProfile } from '../../../types/profile'
import { CURRENT_PROFILE_KEY_NAME, MISSING_PROFILE_STORE_ERROR } from './constants'
import type { CurrentProfileState } from './types'

let profileStore: StoreApi<CurrentProfileState> | null = null

const createProfileStore = (
  initialProfile: MinimalProfile | null = null,
): StoreApi<CurrentProfileState> =>
  createStore<CurrentProfileState>()((set) => ({
    currentProfile: initialProfile,
    setCurrentProfile: (profile: MinimalProfile | null) => {
      Cookies.set(CURRENT_PROFILE_KEY_NAME, JSON.stringify(profile))
      set(() => ({ currentProfile: profile }))
    },
    updateProfileIfActive: (profile: MinimalProfile) => {
      set((state) => {
        if (state.currentProfile?.id === profile.id) {
          Cookies.set(CURRENT_PROFILE_KEY_NAME, JSON.stringify(profile))
          return { currentProfile: profile }
        }
        return state
      })
    },
  }))

export const initializeProfileStore = (
  initialProfile: MinimalProfile | null = null,
): StoreApi<CurrentProfileState> => {
  // Create a new store in dev mode to prevent HMR from preserving stale data
  if (process.env.NODE_ENV === 'development' || !profileStore) {
    profileStore = createProfileStore(initialProfile)
    return profileStore
  }

  return profileStore
}

export const getProfileStore = (): StoreApi<CurrentProfileState> => {
  if (!profileStore) {
    throw new Error(MISSING_PROFILE_STORE_ERROR)
  }
  return profileStore
}
export const getCurrentProfileFromStore = (): MinimalProfile | null => {
  const store = getProfileStore()
  return store.getState().currentProfile
}

export const setCurrentProfileInStore = (profile: MinimalProfile | null): void => {
  const store = getProfileStore()
  store.getState().setCurrentProfile(profile)
}

export const updateProfileIfActiveInStore = (profile: MinimalProfile): void => {
  const store = getProfileStore()
  store.getState().updateProfileIfActive(profile)
}

export const resetProfileStore = (): void => {
  Cookies.remove(CURRENT_PROFILE_KEY_NAME)
  profileStore = null
}
