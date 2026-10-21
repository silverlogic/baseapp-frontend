import { type DjangoPaginatedResponse, axios } from '@baseapp-frontend/utils'

import type { LoginMfaRequest } from '../types/auth'
import type {
  MfaActivationResponse,
  MfaActiveMethodResponse,
  MfaConfigurationResponse,
  MfaConfirmationResponse,
  MfaDeactivateRequest,
  MfaRequest,
  MfaRequestCodeRequest,
  MfaRequestCodeResponse,
} from '../types/mfa'

// baseapp_auth mounts the django-trench endpoints under `auth/mfa/`
const baseUrl = '/auth/mfa'

export default class MfaApi {
  static activate({ method }: Pick<MfaRequest, 'method'>): Promise<MfaActivationResponse> {
    return axios.post(`${baseUrl}/${method}/activate/`)
  }

  static confirmActivation({ method, code }: MfaRequest): Promise<MfaConfirmationResponse> {
    return axios.post(`${baseUrl}/${method}/activate/confirm/`, { code })
  }

  static getActiveMethods(): Promise<DjangoPaginatedResponse<MfaActiveMethodResponse>> {
    return axios.get(`${baseUrl}/user-active-methods/`)
  }

  static getConfiguration(): Promise<MfaConfigurationResponse> {
    return axios.get(`${baseUrl}/config/`)
  }

  /**
   * Sends a new code for `method`, or for the user's primary method when `method` is omitted.
   */
  static sendCode({ method }: MfaRequestCodeRequest = {}): Promise<MfaRequestCodeResponse> {
    return axios.post(`${baseUrl}/code/request/`, method ? { method } : {})
  }

  static deactivate({ method, code }: MfaDeactivateRequest): Promise<void> {
    return axios.post(`${baseUrl}/${method}/deactivate/`, { code })
  }

  static regenerateBackupCodes({ method, code }: MfaRequest): Promise<void> {
    return axios.post(`${baseUrl}/${method}/codes/regenerate/`, { code })
  }

  // TODO: review this endpoint
  static loginStep2(data: LoginMfaRequest): Promise<any> {
    return axios.post('/auth/login/code', data)
  }
}

export const MFA_API_KEY = {
  default: ['mfa'],
  getActiveMethods: () => [...MFA_API_KEY.default, 'getActiveMethods'] as const,
  getConfiguration: () => [...MFA_API_KEY.default, 'getConfiguration'] as const,
  sendCode: () => [...MFA_API_KEY.default, 'sendCode'] as const,
}
