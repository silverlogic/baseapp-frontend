'use client'

import { Profile } from '@baseapp-frontend/authentication'
import { ServerSideRenderingOption, getCookie, setCookie } from '@baseapp-frontend/utils'

import { atom, useAtom } from 'jotai'

import { PROFILE_KEY } from './constants'

const getProfileFromCookie = ({ noSSR = true }: ServerSideRenderingOption = {}) => {
  const settings = getCookie<Profile>(PROFILE_KEY, { noSSR, parseJSON: true }) ?? null

  return settings
}

const initialProfile = getProfileFromCookie()

const profileAtom = atom<Profile>(initialProfile)

/**
 * By using `useCurrentProfile` with the `noSSR` option set to `false`, causes Next.js to dynamically render the affected pages, instead of statically rendering them.
 */
const useCurrentProfile = ({ noSSR = true }: ServerSideRenderingOption = {}) => {
  const [currentProfile, setProfile] = useAtom(profileAtom)
  const isSSR = typeof window === typeof undefined

  const setCurrentProfile = (newProfile: Profile) => {
    setProfile(() => {
      setCookie(PROFILE_KEY, newProfile, { stringfyValue: true })
      return newProfile
    })
  }

  if (isSSR) {
    return {
      currentProfile: getProfileFromCookie({ noSSR }),
      setCurrentProfile,
    }
  }
  return {
    currentProfile,
    setCurrentProfile,
  }
}

export default useCurrentProfile
