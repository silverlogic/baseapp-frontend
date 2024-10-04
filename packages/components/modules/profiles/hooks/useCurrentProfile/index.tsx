'use client'

import { useEffect } from 'react'

import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { SyncStorage } from 'jotai/vanilla/utils/atomWithStorage'
import { useFragment, useLazyLoadQuery } from 'react-relay'

import { ProfileItemFragment$key } from '../../../../__generated__/ProfileItemFragment.graphql'
import { UserProfileQuery as UserProfileQueryType } from '../../../../__generated__/UserProfileQuery.graphql'
import { ProfileItemFragment } from '../../graphql/queries/ProfileItem'
import { UserProfileQuery } from '../../graphql/queries/UserProfile'
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

/**
 * Responsible for handling the current profile state. If there is no profile in the state, it will
 * fetch the user's main profile and set it as the current profile.
 *
 * @returns {currentProfile, setCurrentProfile}
 */
const useCurrentProfile = () => {
  const [currentProfile, setCurrentProfile] = useAtom(currentProfileAtom)

  const isSSR = typeof window === 'undefined'
  const shouldFetchProfile = !isSSR && !currentProfile?.profile

  const { me } = useLazyLoadQuery<UserProfileQueryType>(
    UserProfileQuery,
    {},
    { fetchPolicy: shouldFetchProfile ? 'store-or-network' : 'store-only' },
  )

  const userMainProfile = useFragment<ProfileItemFragment$key>(ProfileItemFragment, me?.profile)

  useEffect(() => {
    if (userMainProfile && shouldFetchProfile) {
      setCurrentProfile({ profile: userMainProfile })
    }
  }, [userMainProfile, shouldFetchProfile, setCurrentProfile])

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
