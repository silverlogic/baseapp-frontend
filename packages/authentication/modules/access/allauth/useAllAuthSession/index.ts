'use client'

import {
  ACCESS_KEY_NAME,
  REFRESH_KEY_NAME,
  SESSION_TOKEN_KEY_NAME,
  removeTokenAsync,
  setTokenAsync,
} from '@baseapp-frontend/utils'
import { CURRENT_PROFILE_KEY_NAME } from '@baseapp-frontend/utils/constants/profile'
import { isMobilePlatform } from '@baseapp-frontend/utils/functions/os'

import { useCurrentProfile } from '../../../profile'
import { setProfileExpoStorage } from '../../../profile/utils'
import type { MinimalProfile } from '../../../../types/profile'
import type { AllAuthSessionData } from './types'

export function useAllAuthSession() {
  const { setCurrentProfile } = useCurrentProfile()

  async function startSession(sessionData: AllAuthSessionData) {
    const { accessToken, refreshToken, sessionToken, rawResponse } = sessionData

    await setTokenAsync(ACCESS_KEY_NAME, accessToken, {
      secure: process.env.NODE_ENV === 'production',
    })
    await setTokenAsync(REFRESH_KEY_NAME, refreshToken, {
      secure: process.env.NODE_ENV === 'production',
    })

    if (sessionToken) {
      await setTokenAsync(SESSION_TOKEN_KEY_NAME, sessionToken, {
        secure: process.env.NODE_ENV === 'production',
      })
    }

    const profile = rawResponse?.meta?.profile
    if (profile?.id) {
      const isWebPlatform = !isMobilePlatform()
      const API_BASE_URL = isWebPlatform
        ? process.env.NEXT_PUBLIC_API_BASE_URL
        : process.env.EXPO_PUBLIC_API_BASE_URL
      const baseUrl = API_BASE_URL?.replace('/v1', '')
      let absoluteImagePath = null
      if (profile.image) {
        absoluteImagePath = profile.image.startsWith('http') || !baseUrl
          ? profile.image
          : `${baseUrl}${profile.image}`
      }

      const currentProfile: MinimalProfile = {
        id: profile.id,
        name: profile.name ?? null,
        image: absoluteImagePath,
        urlPath: profile.urlPath ?? null,
      }

      setCurrentProfile(currentProfile)
      await setProfileExpoStorage(currentProfile)
    }
  }

  async function clearSession() {
    await removeTokenAsync(ACCESS_KEY_NAME)
    await removeTokenAsync(REFRESH_KEY_NAME)
    await removeTokenAsync(SESSION_TOKEN_KEY_NAME)
    await removeTokenAsync(CURRENT_PROFILE_KEY_NAME)
    setCurrentProfile(null)
  }

  return { startSession, clearSession }
}
