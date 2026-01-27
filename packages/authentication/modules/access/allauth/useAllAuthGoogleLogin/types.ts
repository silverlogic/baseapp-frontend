import type { UseGoogleLoginOptionsImplicitFlow } from '@react-oauth/google'
import type { UseMutationOptions } from '@tanstack/react-query'

import type { AllAuthLoginResponse } from '../../../../types/allauth'

/**
 * Google tokens to send to backend
 */
export interface GoogleTokens {
  access_token: string
  id_token?: string
}

export interface UseAllAuthGoogleLoginOptions {
  googleLoginOptions?: Omit<UseGoogleLoginOptionsImplicitFlow, 'onSuccess' | 'onError' | 'flow'>
  backendLoginOptions?: Omit<
    UseMutationOptions<AllAuthLoginResponse, Error, GoogleTokens>,
    'mutationFn'
  >
}
