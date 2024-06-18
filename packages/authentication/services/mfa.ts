import { DjangoPaginatedResponse, axios } from '@baseapp-frontend/utils'

import { LoginMfaRequest, LoginSimpleTokenResponse } from '../types/auth'
import {
  MfaActivationResponse,
  MfaActiveMethodResponse,
  MfaConfigurationResponse,
  MfaConfirmationResponse,
  MfaDeactivateRequest,
  MfaRequest,
} from '../types/mfa'

const baseUrl = '/auth'

export default class MfaApi {
  static activate({ method }: Pick<MfaRequest, 'method'>): Promise<MfaActivationResponse> {
    return axios.post(`${baseUrl}/${method}/activate/`)
  }

  static confirmActivation({ method, code }: MfaRequest): Promise<MfaConfirmationResponse> {
    return axios.post(`${baseUrl}/${method}/activate/confirm/`, { code })
  }

  static getActiveMethods(): Promise<DjangoPaginatedResponse<MfaActiveMethodResponse>> {
    return axios.get(`${baseUrl}/mfa/user-active-methods/`)
  }

  static getConfiguration(): Promise<MfaConfigurationResponse> {
    return axios.get(`${baseUrl}/mfa/config/`)
  }

  static sendCode(): Promise<void> {
    return axios.get(`${baseUrl}/code/request/`)
  }

  static deactivate({ method, code }: MfaDeactivateRequest): Promise<void> {
    return axios.post(`${baseUrl}/${method}/deactivate/`, { code })
  }

  static regenerateBackupCodes({ method, code }: MfaRequest): Promise<void> {
    return axios.post(`${baseUrl}/${method}/codes/regenerate/`, { code })
  }

  static loginStep2(data: LoginMfaRequest): Promise<LoginSimpleTokenResponse> {
    return axios.post('/auth/login/code', data)
  }
}

export const MFA_API_KEY = {
  default: ['mfa'],
  getActiveMethods: () => [...MFA_API_KEY.default, 'getActiveMethods'] as const,
  getConfiguration: () => [...MFA_API_KEY.default, 'getConfiguration'] as const,
  sendCode: () => [...MFA_API_KEY.default, 'sendCode'] as const,
}
