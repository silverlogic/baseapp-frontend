'use client'

import { useEffect } from 'react'

import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { SyncStorage } from 'jotai/vanilla/utils/atomWithStorage'
import { useFragment } from 'react-relay'

import { ProfileItemFragment$key } from '../../../../__generated__/ProfileItemFragment.graphql'
import { ProfileItemFragment } from '../../graphql/queries/ProfileItem'
import { DEFAULT_CURRENT_PROFILE_KEY, DEFAULT_CURRENT_PROFILE_SETTINGS } from './constants'
import { CurrentProfile } from './types'

const localStorageSync: SyncStorage<CurrentProfile> = {
  getItem: (key: string) => {
    if (typeof window !== typeof undefined) {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    }
    return null
  },
  setItem: (key: string, value: CurrentProfile) => {
    if (typeof window !== typeof undefined) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  },
  removeItem: (key: string) => {
    if (typeof window !== typeof undefined) {
      localStorage.removeItem(key)
    }
  },
}

const currentProfileAtom = atomWithStorage<CurrentProfile>(
  DEFAULT_CURRENT_PROFILE_KEY,
  DEFAULT_CURRENT_PROFILE_SETTINGS,
  localStorageSync,
  { getOnInit: true },
)

const useCurrentProfile = (mainProfileRef?: ProfileItemFragment$key | null) => {
  const [currentProfile, setCurrentProfile] = useAtom(currentProfileAtom)
  const mainProfile = useFragment<ProfileItemFragment$key>(ProfileItemFragment, mainProfileRef)

  useEffect(() => {
    if (mainProfile && !currentProfile) {
      setCurrentProfile({ profile: mainProfile })
    }
  }, [mainProfile, currentProfile, setCurrentProfile])

  const isSSR = typeof window === typeof undefined

  const handleSetCurrentProfile = (newCurrentProfile: Partial<CurrentProfile>) => {
    setCurrentProfile((prevCurrentProfile: CurrentProfile) => {
      const updatedCurrentProfile = { ...prevCurrentProfile, ...newCurrentProfile }
      return updatedCurrentProfile
    })
  }

  if (isSSR) {
    // SSR fallback, return default settings if in a server-side context
    return {
      currentProfile: DEFAULT_CURRENT_PROFILE_SETTINGS,
      setCurrentProfile: handleSetCurrentProfile,
    }
  }

  return {
    currentProfile,
    setCurrentProfile: handleSetCurrentProfile,
  }
}

export default useCurrentProfile
