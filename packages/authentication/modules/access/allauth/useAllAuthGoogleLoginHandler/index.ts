import { useState } from 'react'

import { useNotification } from '@baseapp-frontend/utils'

import type { AllAuthLoginResponse } from '../../../../types/allauth'
import { useAllAuthSession } from '../useAllAuthSession'

export interface UseAllAuthGoogleLoginHandlerOptions {
  onSuccess?: () => void
}

/**
 * Shared hook for handling Google OAuth login success across login/signup flows.
 * Extracts tokens, starts session, calls success callback, and manages loading state.
 */
export const useAllAuthGoogleLoginHandler = (options?: UseAllAuthGoogleLoginHandlerOptions) => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const { sendApiErrorToast } = useNotification()
  const { startSession } = useAllAuthSession()

  const startGoogleLogin = () => setIsGoogleLoading(true)

  const clearGoogleLoading = () => setIsGoogleLoading(false)

  const handleGoogleLoginSuccess = async (response: AllAuthLoginResponse) => {
    try {
      const accessToken = response.meta?.accessToken
      const refreshToken = response.meta?.refreshToken

      if (typeof accessToken === 'string' && typeof refreshToken === 'string') {
        await startSession({
          accessToken,
          refreshToken,
          rawResponse: response,
        })

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
