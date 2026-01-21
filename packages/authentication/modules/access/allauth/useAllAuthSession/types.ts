import type { AllAuthLoginResponse } from '../../../../types/allauth'

export interface AllAuthSessionData {
  accessToken: string
  refreshToken: string
  rawResponse?: AllAuthLoginResponse
}
