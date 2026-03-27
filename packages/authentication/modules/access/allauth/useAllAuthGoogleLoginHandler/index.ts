'use client'

import { useState } from 'react'

import { useNotification } from '@baseapp-frontend/utils'

import type { AllAuthLoginResponse } from '../../../../types/allauth'
import type { User } from '../../../../types/user'
import { mapLoginResponse } from '../../../auth-strategy/allauth/utils'
import { useCurrentProfile } from '../../../profile'
import { setProfileExpoStorage } from '../../../profile/utils'
import {
  resolveProfileFromAuthResult,
  writeSessionFromAuthResult,
} from '../../useLogin/login-success-handler'

export interface UseAllAuthGoogleLoginHandlerOptions {
  onSuccess?: (user: User | null) => void | Promise<void>
}

export const useAllAuthGoogleLoginHandler = (options?: UseAllAuthGoogleLoginHandlerOptions) => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const { sendApiErrorToast } = useNotification()
  const { setCurrentProfile } = useCurrentProfile()

  const startGoogleLogin = () => setIsGoogleLoading(true)

  const clearGoogleLoading = () => setIsGoogleLoading(false)

  const handleGoogleLoginSuccess = async (response: AllAuthLoginResponse) => {
    try {
      const result = mapLoginResponse(response)

      if (
        result.kind === 'success' &&
        result.session?.accessToken &&
        result.session?.refreshToken
      ) {
        await writeSessionFromAuthResult(result)

        const profile = resolveProfileFromAuthResult(result)
        if (profile) {
          setCurrentProfile(profile)
          await setProfileExpoStorage(profile)
        }

        await options?.onSuccess?.(result.user ?? null)
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
