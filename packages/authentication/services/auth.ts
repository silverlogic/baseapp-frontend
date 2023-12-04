import { axios } from '@baseapp-frontend/utils'
import { TokenTypes } from '@baseapp-frontend/utils/constants/token'

import {
  IForgotPasswordRequest,
  ILoginRequest,
  IPreAuthRequest,
  IRegisterRequest,
  IResetPasswordRequest,
  LoginResponse,
  PreAuthResponse,
} from '../types/auth'

export default class AuthApi {
  static login({ email, password }: ILoginRequest): Promise<LoginResponse> {
    return axios.post(`/auth/login`, { email, password })
  }

  static recoverPassword({ email }: IForgotPasswordRequest): Promise<void> {
    return axios.post(`/forgot-password`, { email })
  }

  static resetPassword({ newPassword, token }: IResetPasswordRequest): Promise<void> {
    return axios.post(`/forgot-password/reset`, { newPassword, token })
  }

  static register<TResponse = void>(request: IRegisterRequest): Promise<TResponse> {
    return axios.post(`/register`, request)
  }

  static preAuth(request: IPreAuthRequest, tokenType: TokenTypes): Promise<PreAuthResponse> {
    switch (tokenType) {
      case TokenTypes.jwt:
        return axios.post(`/auth/pre-auth/jwt`, request)
      case TokenTypes.simple:
        return axios.post(`/auth/pre-auth/auth-token`, request)
      default:
        return Promise.reject(new Error(`Unknown token type: ${tokenType}`))
    }
  }
}

export const PRE_AUTH_API_KEY = {
  default: ['auth'],
  preAuth: (token: string, tokenType: TokenTypes) =>
    [...PRE_AUTH_API_KEY.default, 'preAuth', token, tokenType] as const,
}
