import { axios } from '@baseapp-frontend/utils'

import {
  IForgotPasswordRequest,
  ILoginRequest,
  IRegisterRequest,
  IResetPasswordRequest,
  LoginResponse,
} from '../types/auth'

export default class AuthApi {
  static login({ email, password }: ILoginRequest): Promise<LoginResponse> {
    return axios.post(`/auth`, { email, password })
  }

  static simpleTokenLogin({ email, password }: ILoginRequest): Promise<LoginResponse> {
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
}
