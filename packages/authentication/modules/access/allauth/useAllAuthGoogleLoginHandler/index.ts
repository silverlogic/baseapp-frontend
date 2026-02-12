import { useNotification } from '@baseapp-frontend/utils'

import type { AllAuthLoginResponse } from '../../../../types/allauth'
import { useAllAuthSession } from '../useAllAuthSession'

export interface UseAllAuthGoogleLoginHandlerOptions {
  onSuccess?: () => void
}

/**
 * Shared hook for handling Google OAuth login success across login/signup flows.
 * Extracts tokens, starts session, and calls success callback.
 */
export const useAllAuthGoogleLoginHandler = (options?: UseAllAuthGoogleLoginHandlerOptions) => {
  const { sendApiErrorToast } = useNotification()
  const { startSession } = useAllAuthSession()

  const handleGoogleLoginSuccess = async (response: AllAuthLoginResponse) => {
    const accessToken = response.meta?.accessToken
    const refreshToken = response.meta?.refreshToken

    if (typeof accessToken === 'string' && typeof refreshToken === 'string') {
      await startSession({
        accessToken,
        refreshToken,
        rawResponse: response,
      })

      // Call success callback if provided
      options?.onSuccess?.()
    } else {
      sendApiErrorToast({ message: 'Failed to complete login - tokens not found' })
    }
  }

  const handleGoogleLoginError = (error: unknown) => {
    sendApiErrorToast(error)
  }

  return {
    handleGoogleLoginSuccess,
    handleGoogleLoginError,
  }
}
