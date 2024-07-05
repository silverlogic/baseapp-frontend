import { MfaMethod } from './mfa'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginMfaRequest {
  ephemeralToken: string
  token: string
}

export interface LoginMfaResponse {
  ephemeralToken: string
  method: MfaMethod
}

export interface LoginSimpleTokenResponse {
  token: string
}

export interface LoginJWTResponse {
  access: string
  refresh: string
}

export interface LoginChangeExpiredPasswordRedirectResponse {
  redirectUrl: string
}

export type LoginResponse =
  | LoginMfaResponse
  | LoginSimpleTokenResponse
  | LoginJWTResponse
  | LoginChangeExpiredPasswordRedirectResponse

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  newPassword: string
  token: string
}

export interface RegisterRequest {
  firstName?: string
  lastName?: string
  email: string
  password: string
}

export interface CustomCookieNames {
  cookieName?: string
  refreshCookieName?: string
}

export interface PreAuthRequest {
  token: string
}

export type PreAuthResponse = LoginSimpleTokenResponse | LoginJWTResponse

export interface ChangeExpiredPasswordRequest {
  currentPassword: string
  newPassword: string
  token: string
}
