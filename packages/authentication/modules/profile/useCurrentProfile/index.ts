'use client'

import { useCallback, useEffect } from 'react'

import {
  LOGOUT_EVENT,
  ServerSideRenderingOption,
  eventEmitter,
  getCookie,
  removeCookie,
  setCookie,
} from '@baseapp-frontend/utils'

import { atom, useAtom } from 'jotai'

import { MinimalProfile } from '../../../types/profile'
import { CURRENT_PROFILE_KEY } from './constants'

export const getProfileFromCookie = ({ noSSR = true }: ServerSideRenderingOption = {}) => {
  const settings =
    getCookie<MinimalProfile | undefined>(CURRENT_PROFILE_KEY, { noSSR, parseJSON: true }) ?? null

  return settings
}

const initialProfile = getProfileFromCookie()

export const profileAtom = atom<MinimalProfile | null>(initialProfile)

profileAtom.onMount = (setAtom) => {
  const removeCurrentProfile = () => {
    setAtom(null)
    removeCookie(CURRENT_PROFILE_KEY)
  }
  eventEmitter.on(LOGOUT_EVENT, removeCurrentProfile)
  return () => {
    eventEmitter.off(LOGOUT_EVENT, removeCurrentProfile)
  }
}

/**
 * By using `useCurrentProfile` with the `noSSR` option set to `false`, causes Next.js to dynamically render the affected pages, instead of statically rendering them.
 */
const useCurrentProfile = ({ noSSR = true }: ServerSideRenderingOption = {}) => {
  const [currentProfile, setProfile] = useAtom(profileAtom)
  const isSSR = typeof window === typeof undefined

  const setCurrentProfile = (newProfile: MinimalProfile | null) => {
    if (newProfile === null) {
      setProfile(() => {
        removeCookie(CURRENT_PROFILE_KEY)
        return null
      })
    } else {
      setProfile(() => {
        setCookie(CURRENT_PROFILE_KEY, newProfile, { stringfyValue: true })
        return newProfile
      })
    }
  }

  const updateProfileIfActive = (newProfile: MinimalProfile) => {
    if (currentProfile?.id === newProfile.id) {
      setCurrentProfile(newProfile)
    }
  }

  const removeCurrentProfile = useCallback(() => setCurrentProfile(null), [])

  useEffect(() => {
    eventEmitter.on(LOGOUT_EVENT, removeCurrentProfile)
    return () => {
      eventEmitter.off(LOGOUT_EVENT, removeCurrentProfile)
    }
  }, [])

  if (isSSR) {
    return {
      currentProfile: getProfileFromCookie({ noSSR }),
      setCurrentProfile,
      updateProfileIfActive,
    }
  }
  return {
    currentProfile,
    setCurrentProfile,
    updateProfileIfActive,
  }
}

export default useCurrentProfile
