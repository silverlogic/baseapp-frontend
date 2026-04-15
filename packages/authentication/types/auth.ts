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
  firstName?: string
  lastName?: string
  email: string
  password: string
}

export interface CustomJWTKeyNames {
  accessKeyName?: string
  refreshKeyName?: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
}

export interface ChangeExpiredPasswordRequest extends ChangePasswordRequest {
  token: string
}

export interface RequestEmailChangeRequest {
  newEmail: string
}

export interface ConfirmEmailParams {
  id: string
  token: string
}
