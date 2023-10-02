import { IDjangoPaginatedResponse, axios } from '@baseapp-frontend/utils'

import { ILoginMfaRequest, ILoginSimpleTokenResponse } from '../types/auth'
import {
  IMfaActivationResponse,
  IMfaActiveMethodResponse,
  IMfaConfigurationResponse,
  IMfaConfirmationResponse,
  IMfaDeactivateRequest,
  IMfaRequest,
} from '../types/mfa'

const baseUrl = '/auth'

export default class MfaApi {
  static activate({ method }: Pick<IMfaRequest, 'method'>): Promise<IMfaActivationResponse> {
    return axios.post(`${baseUrl}/${method}/activate/`)
  }

  static confirmActivation({ method, code }: IMfaRequest): Promise<IMfaConfirmationResponse> {
    return axios.post(`${baseUrl}/${method}/activate/confirm/`, { code })
  }

  static getActiveMethods(): Promise<IDjangoPaginatedResponse<IMfaActiveMethodResponse>> {
    return axios.get(`${baseUrl}/mfa/user-active-methods/`)
  }

  static getConfiguration(): Promise<IMfaConfigurationResponse> {
    return axios.get(`${baseUrl}/mfa/config/`)
  }

  static sendCode(): Promise<void> {
    return axios.get(`${baseUrl}/code/request/`)
  }

  static deactivate({ method, code }: IMfaDeactivateRequest): Promise<void> {
    return axios.post(`${baseUrl}/${method}/deactivate/`, { code })
  }

  static regenerateBackupCodes({ method, code }: IMfaRequest): Promise<void> {
    return axios.post(`${baseUrl}/${method}/codes/regenerate/`, { code })
  }

  static loginStep2(data: ILoginMfaRequest): Promise<ILoginSimpleTokenResponse> {
    return axios.post('/auth/login/code', data)
  }
}

export const MFA_API_KEY = {
  default: ['mfa'],
  getActiveMethods: () => [...MFA_API_KEY.default, 'getActiveMethods'] as const,
  getConfiguration: () => [...MFA_API_KEY.default, 'getConfiguration'] as const,
  sendCode: () => [...MFA_API_KEY.default, 'sendCode'] as const,
}
