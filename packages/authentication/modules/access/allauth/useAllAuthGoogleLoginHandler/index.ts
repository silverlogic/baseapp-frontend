import { useState } from 'react'

import { useNotification } from '@baseapp-frontend/utils'
import { isMobilePlatform } from '@baseapp-frontend/utils/functions/os'

import { getSessionService } from '../../../../session/client'
import type { AllAuthLoginResponse } from '../../../../types/allauth'
import type { MinimalProfile } from '../../../../types/profile'
import { useCurrentProfile } from '../../../profile'
import { setProfileExpoStorage } from '../../../profile/utils'

export interface UseAllAuthGoogleLoginHandlerOptions {
  onSuccess?: () => void
}

export const useAllAuthGoogleLoginHandler = (options?: UseAllAuthGoogleLoginHandlerOptions) => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const { sendApiErrorToast } = useNotification()
  const { setCurrentProfile } = useCurrentProfile()

  const startGoogleLogin = () => setIsGoogleLoading(true)

  const clearGoogleLoading = () => setIsGoogleLoading(false)

  const handleGoogleLoginSuccess = async (response: AllAuthLoginResponse) => {
    try {
      const accessToken = response.meta?.accessToken
      const refreshToken = response.meta?.refreshToken

      if (typeof accessToken === 'string' && typeof refreshToken === 'string') {
        const sessionService = getSessionService()
        await sessionService.write({
          accessToken,
          refreshToken,
          sessionToken: response.meta?.sessionToken ?? null,
        })

        const profile = response.meta?.profile
        if (profile?.id) {
          const isWebPlatform = !isMobilePlatform()
          const API_BASE_URL = isWebPlatform
            ? process.env.NEXT_PUBLIC_API_BASE_URL
            : process.env.EXPO_PUBLIC_API_BASE_URL
          const baseUrl = API_BASE_URL?.replace('/v1', '')
          let absoluteImagePath = null
          if (profile.image) {
            absoluteImagePath =
              profile.image.startsWith('http') || !baseUrl
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

        options?.onSuccess?.()
      } else {
        sendApiErrorToast({ message: 'Failed to complete login - tokens not found' })
      }
    } finally {
      setIsGoogleLoading(false)
    }
  }

  const handleGoogleLoginError = (error: unknown) => {
    setIsGoogleLoading(false)
    sendApiErrorToast(error)
  }

  return {
    handleGoogleLoginSuccess,
    handleGoogleLoginError,
    isGoogleLoading,
    startGoogleLogin,
    clearGoogleLoading,
  }
}
