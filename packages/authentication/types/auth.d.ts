import { MfaMethod } from './mfa'

export interface ILoginRequest {
  email: string
  password: string
}

export interface ILoginMfaRequest {
  ephemeralToken: string
  token: string
}

export interface ILoginMfaResponse {
  ephemeralToken: string
  method: MfaMethod
}

export interface ILoginRegularResponse {
  token: string
}

export type LoginResponse = ILoginMfaResponse | ILoginRegularResponse

export interface IForgotPasswordRequest {
  email: string
}

export interface IResetPasswordRequest {
  newPassword: string
  token: string
}

export interface IRegisterRequest {
  firstName?: string
  lastName?: string
  phoneNumber?: string
  email: string
  password: string
  acceptConsent?: boolean
}
