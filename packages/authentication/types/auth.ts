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
