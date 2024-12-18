export interface LoginChangeExpiredPasswordRedirectResponse {
  redirectUrl: string
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

export interface ForgotPasswordRequest {
  email: string
}

export interface TempResetPasswordRequest {
  newPassword: string
  token: string
}
