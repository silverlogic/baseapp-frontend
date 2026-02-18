'use client'

import type { CredentialResponse } from '@react-oauth/google'
import { useMutation } from '@tanstack/react-query'

import AllAuthApi from '../../../../services/allauth'
import type { UseAllAuthGoogleLoginOptions } from './types'

/**
 * Hook for Google OAuth login using AllAuth Headless provider token endpoint
 *
 * IMPORTANT: AllAuth's provider/token endpoint for Google requires an id_token (JWT),
 * not an access_token. This is because AllAuth validates the token locally by verifying
 * the JWT signature, without needing to call Google's API.
 *
 * This means we need to use Google Sign-In Button with credential response,
 * NOT the authorization code flow from useGoogleLogin.
 *
 * @example
 * ```tsx
 * const { loginWithGoogle, isLoading } = useAllAuthGoogleLogin({
 *   backendLoginOptions: {
 *     onSuccess: (data) => {
 *       // Handle successful login with JWT tokens
 *       startSession(data)
 *     }
 *   }
 * })
 *
 * // Note: You should use GoogleLogin button component or useGoogleOneTapLogin
 * // instead of calling loginWithGoogle directly
 * <GoogleLogin onSuccess={loginWithGoogle} />
 * ```
 */
const useAllAuthGoogleLogin = ({ backendLoginOptions = {} }: UseAllAuthGoogleLoginOptions = {}) => {
  // MUTATION: Send Google id_token to backend
  const backendLoginMutation = useMutation({
    mutationFn: (idToken: string) => AllAuthApi.googleLogin({ id_token: idToken }),
    ...backendLoginOptions,
  })

  // Handler for Google Sign-In credential response
  const loginWithGoogle = (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      return
    }

    // The credential is the id_token (JWT) that AllAuth expects
    backendLoginMutation.mutate(credentialResponse.credential)
  }

  return {
    loginWithGoogle,
    isLoading: backendLoginMutation.isPending,
    error: backendLoginMutation.error,
    backendLoginMutation,
  }
}

export default useAllAuthGoogleLogin
