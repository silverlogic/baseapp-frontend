'use client'

import { useEffect } from 'react'

import { MinimalProfile } from '@baseapp-frontend/authentication'
import {
  LOGOUT_EVENT,
  ServerSideRenderingOption,
  eventEmitter,
  getCookie,
  removeCookie,
  setCookie,
} from '@baseapp-frontend/utils'

import { atom, useAtom } from 'jotai'

import { PROFILE_KEY } from './constants'

const getProfileFromCookie = ({ noSSR = true }: ServerSideRenderingOption = {}) => {
  const settings =
    getCookie<MinimalProfile | null>(PROFILE_KEY, { noSSR, parseJSON: true }) ?? undefined

  return settings
}

const initialProfile = getProfileFromCookie()

const profileAtom = atom<MinimalProfile | undefined>(initialProfile)

/**
 * By using `useCurrentProfile` with the `noSSR` option set to `false`, causes Next.js to dynamically render the affected pages, instead of statically rendering them.
 */
const useCurrentProfile = ({ noSSR = true }: ServerSideRenderingOption = {}) => {
  const [currentProfile, setProfile] = useAtom(profileAtom)
  const isSSR = typeof window === typeof undefined

  const setCurrentProfile = (newProfile: MinimalProfile) => {
    setProfile(() => {
      setCookie(PROFILE_KEY, newProfile, { stringfyValue: true })
      return newProfile
    })
  }

  const updateProfileIfActive = (newProfile: MinimalProfile) => {
    if (currentProfile?.id === newProfile.id) setCurrentProfile(newProfile)
  }

  const removeCurrentProfile = () => {
    setProfile(() => {
      removeCookie(PROFILE_KEY)
      return undefined
    })
  }

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
