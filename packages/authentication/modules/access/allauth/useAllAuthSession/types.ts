import type { AllAuthLoginResponse } from '../../../../types/allauth'

export interface AllAuthSessionData {
  accessToken: string
  refreshToken: string
  sessionToken?: string
  rawResponse?: AllAuthLoginResponse
}
