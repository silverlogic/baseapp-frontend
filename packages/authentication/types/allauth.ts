import type { MinimalProfile } from './profile'

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
  profile?: Partial<MinimalProfile>
  id?: string | number
  email?: string
  [key: string]: unknown
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

export interface AllAuthLoginMethod {
  method: string
  at?: number
  email?: string
  [key: string]: unknown
}

export interface AllAuthLoginData {
  user?: AllAuthUser
  flows?: Array<{
    id: string
    isPending?: boolean
  }>
  methods?: AllAuthLoginMethod[]
}

export interface AllAuthLoginMeta extends AllAuthMeta {
  accessToken: string
  refreshToken: string
  sessionToken: string
}

export interface AllAuthLoginResponse extends AllAuthResponse<AllAuthLoginData> {
  meta: AllAuthLoginMeta
  redirectUrl?: string
}

export interface AllAuthResetPasswordRequest {
  password: string
  key: string
}

export interface AllAuthResetPasswordResponse extends AllAuthResponse<void> {}

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
  sessionToken: string
}

export interface AllAuthSocialProvider {
  id: string
  name: string
  flows: string[]
}

export interface AllAuthSocialProvidersData {
  providers: AllAuthSocialProvider[]
}

export interface AllAuthSocialProvidersResponse
  extends AllAuthResponse<AllAuthSocialProvidersData> {}
