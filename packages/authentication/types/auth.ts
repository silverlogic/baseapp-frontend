import type { MfaMethod } from './mfa'
import { User } from './user'

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

export interface AllAuthMethod {
  method: string
  at: number
  email: string
}

export interface AllAuthResponse {
  status: number
  data: {
    user: User
    methods: AllAuthMethod[]
  }
  meta: {
    isAuthenticated: boolean
    sessionToken: string
    accessToken: LoginJWTResponse
  }
}

export type LoginResponse =
  | LoginMfaResponse
  | LoginJWTResponse
  | LoginChangeExpiredPasswordRedirectResponse
  | AllAuthResponse

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

export interface CustomJWTKeyNames {
  accessKeyName?: string
  refreshKeyName?: string
}

export interface ChangeExpiredPasswordRequest {
  currentPassword: string
  newPassword: string
  token: string
}

export interface AllAuthError {
  status: number
  meta: {
    session_token: string
    is_authenticated: boolean
  }
  data: {
    flows: {
      is_pending?: boolean
      id: string
    }[]
  }
}
