export interface AllAuthUser {
  id: string | number
  email?: string
  username?: string
  display?: string
  firstName?: string
  lastName?: string
  isActive?: boolean
  [key: string]: unknown
}

export interface AllAuthMeta {
  isAuthenticated?: boolean
  sessionToken?: string
  accessToken?: string
  refreshToken?: string
  expiresIn?: number
}

export interface AllAuthError {
  message: string
  code?: string
  param?: string
}

export interface AllAuthResponse<T = unknown> {
  status: number
  data?: T
  meta?: AllAuthMeta
  errors?: AllAuthError[]
}

export interface AllAuthLoginData {
  user?: AllAuthUser
  flows?: Array<{
    id: string
    isPending?: boolean
  }>
  accessToken?: string
  refreshToken?: string
}

export interface AllAuthLoginResponse extends AllAuthResponse<AllAuthLoginData> {}

export interface AllAuthSignupData {
  user?: AllAuthUser
  flows?: Array<{
    id: string
    isPending?: boolean
  }>
}

export interface AllAuthSignupResponse extends AllAuthResponse<AllAuthSignupData> {}

export interface AllAuthSessionData {
  user?: AllAuthUser
}

export interface AllAuthSessionResponse extends AllAuthResponse<AllAuthSessionData> {}

export interface AllAuthLoginJWTResponse {
  accessToken: string
  refreshToken: string
}
