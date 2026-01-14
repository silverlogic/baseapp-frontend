'use client'

import {
  ACCESS_KEY_NAME,
  REFRESH_KEY_NAME,
  removeTokenAsync,
  setTokenAsync,
} from '@baseapp-frontend/utils'
import { CURRENT_PROFILE_KEY_NAME } from '@baseapp-frontend/utils/constants/profile'

import { useCurrentProfile } from '../../../profile'
import { setProfileExpoStorage } from '../../../profile/utils'
import type { AllAuthSessionData, UseAllAuthSessionOptions } from './types'

export function useAllAuthSession(options: UseAllAuthSessionOptions = {}) {
  const { accessKeyName = ACCESS_KEY_NAME, refreshKeyName = REFRESH_KEY_NAME } = options
  const { setCurrentProfile } = useCurrentProfile()

  async function startSession(sessionData: AllAuthSessionData) {
    const { accessToken, refreshToken } = sessionData
    const { rawData } = sessionData

    await setTokenAsync(accessKeyName, accessToken, {
      secure: process.env.NODE_ENV === 'production',
    })
    await setTokenAsync(refreshKeyName, refreshToken, {
      secure: process.env.NODE_ENV === 'production',
    })

    if (rawData?.user) {
      const userData = rawData.user
      const currentProfile = {
        id: String(userData.id ?? ''),
        name: userData.display ?? null,
        image: null,
        urlPath: null,
      }

      setCurrentProfile(currentProfile)
      await setProfileExpoStorage(currentProfile)
    }
  }

  async function clearSession() {
    await removeTokenAsync(accessKeyName)
    await removeTokenAsync(refreshKeyName)
    await removeTokenAsync(CURRENT_PROFILE_KEY_NAME)
    setCurrentProfile(null)
  }

  return { startSession, clearSession }
}
