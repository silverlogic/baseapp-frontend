// Do not introduce module-level mutable state here. This file runs during SSR of client
// components; in Next.js App Router, module-level `let` persists across HTTP requests in
// a long-running Node process and leaks user data between sessions. Per-request
// isolation comes from the Provider's `useRef`.
import { CURRENT_PROFILE_KEY_NAME } from '@baseapp-frontend/utils/constants/profile'

import Cookies from 'js-cookie'
import { type StoreApi, createStore } from 'zustand'

import { MinimalProfile } from '../../../types/profile'
import type { CurrentProfileState } from './types'

const getClientSideCurrentProfile = (): MinimalProfile | null => {
  const storedProfile = Cookies.get(CURRENT_PROFILE_KEY_NAME)
  if (storedProfile) {
    try {
      return JSON.parse(storedProfile)
    } catch {
      return null
    }
  }
  return null
}

const createProfileStore = (
  initialProfile?: MinimalProfile | null,
): StoreApi<CurrentProfileState> => {
  // If no initialProfile provided, try to get it from client-side cookies
  const profileToUse = initialProfile || getClientSideCurrentProfile()

  return createStore<CurrentProfileState>()((set) => ({
    currentProfile: profileToUse,
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
}

export const initializeProfileStore = (
  initialProfile: MinimalProfile | null = null,
): StoreApi<CurrentProfileState> => createProfileStore(initialProfile)
