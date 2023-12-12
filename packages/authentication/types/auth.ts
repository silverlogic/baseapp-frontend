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

export interface ILoginSimpleTokenResponse {
  token: string
}

export interface ILoginJWTResponse {
  access: string
  refresh: string
}

export type LoginResponse = ILoginMfaResponse | ILoginSimpleTokenResponse | ILoginJWTResponse

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
  email: string
  password: string
}

export interface ICookieName {
  cookieName?: string
  refreshCookieName?: string
}

export interface IPreAuthRequest {
  token: string
}

export type PreAuthResponse = ILoginSimpleTokenResponse | ILoginJWTResponse
