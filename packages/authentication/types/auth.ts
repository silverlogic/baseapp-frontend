import type { MfaMethod } from './mfa'

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

export interface LoginJWTResponse {
  access: string
  refresh: string
}

export interface LoginChangeExpiredPasswordRedirectResponse {
  redirectUrl: string
}

export type LoginResponse =
  | LoginMfaResponse
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
  name?: string
  email: string
  password: string
}

export interface CustomJWTKeyNames {
  accessKeyName?: string
  refreshKeyName?: string
}

export interface ChangeExpiredPasswordRequest {
  currentPassword: string
  newPassword: string
  token: string
}
