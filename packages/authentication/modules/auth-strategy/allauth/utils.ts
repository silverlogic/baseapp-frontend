import type { AllAuthLoginResponse, AllAuthSignupResponse } from '../../../types/allauth'
import type { AuthResult } from '../types'

export function mapLoginResponse(response: AllAuthLoginResponse): AuthResult {
  if (response.redirectUrl) {
    return {
      kind: 'redirect_required',
      redirectUrl: response.redirectUrl,
      metadata: { rawResponse: response },
    }
  }

  const pendingMfaFlow = response.data?.flows?.find(
    (flow) => flow.isPending && flow.id.includes('mfa'),
  )
  if (pendingMfaFlow) {
    return {
      kind: 'mfa_required',
      ephemeralToken: response.meta?.sessionToken ?? '',
      method: pendingMfaFlow.id,
      metadata: { rawResponse: response },
    }
  }

  return {
    kind: 'success',
    metadata: {
      accessToken: response.meta?.accessToken,
      refreshToken: response.meta?.refreshToken,
      sessionToken: response.meta?.sessionToken,
      rawResponse: response,
    },
  }
}

export function mapSignUpResponse(response: AllAuthSignupResponse): AuthResult {
  return {
    kind: 'success',
    metadata: { rawResponse: response },
  }
}
