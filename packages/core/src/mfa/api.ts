import { AxiosResponse } from 'axios'

import { ILoginMfaRequest, ILoginResponse } from '../auth/types'
import { axios } from '../axios'
import { IPaginatedResponse } from '../types'
import {
  IMfaActivationResponse,
  IMfaActiveMethodResponse,
  IMfaConfigurationResponse,
  IMfaConfirmationResponse,
} from './types'

const baseUrl = '/auth'

export default class MfaApi {
  static activate(method: string): Promise<AxiosResponse<IMfaActivationResponse>> {
    return axios.post(`${baseUrl}/${method}/activate/`)
  }

  static confirmActivation(
    method: string,
    code: string,
  ): Promise<AxiosResponse<IMfaConfirmationResponse>> {
    return axios.post(`${baseUrl}/${method}/activate/confirm/`, { code })
  }

  static getActiveMethods(): Promise<AxiosResponse<IPaginatedResponse<IMfaActiveMethodResponse>>> {
    return axios.get(`${baseUrl}/mfa/user-active-methods/`)
  }

  static getConfiguration(): Promise<AxiosResponse<IMfaConfigurationResponse>> {
    return axios.get(`${baseUrl}/mfa/config/`)
  }

  static sendCode() {
    return axios.get(`${baseUrl}/code/request/`)
  }

  static deactivate(method: string, code?: string) {
    return axios.post(`${baseUrl}/${method}/deactivate/`, { code })
  }

  static regenerateBackupCodes(method: string, code: string) {
    return axios.post(`${baseUrl}/${method}/codes/regenerate/`, { code })
  }

  static loginStep2(data: ILoginMfaRequest): Promise<AxiosResponse<ILoginResponse>> {
    return axios.post('/auth/login/code', data)
  }
}
