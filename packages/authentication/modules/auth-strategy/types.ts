import type { JWTResponse } from '@baseapp-frontend/utils/types/jwt'

import type {
  ChangePasswordRequest,
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
} from '../../types/auth'
import type { User } from '../../types/user'
import type { SESSION_STATUS } from './constants'

export type AuthStrategyId = 'allauth' | 'simplejwt'

export interface AuthError {
  code: string
  message: string
  status?: number
  fieldErrors?: Record<string, string[]>
  cause?: unknown
}

export type AuthResult<TUser = User> =
  | {
      kind: 'success'
      user?: TUser | null
      redirectUrl?: null
      metadata?: Record<string, unknown>
    }
  | {
      kind: 'mfa_required'
      ephemeralToken: string
      method: string
      metadata?: Record<string, unknown>
    }
  | {
      kind: 'redirect_required'
      redirectUrl: string
      metadata?: Record<string, unknown>
    }

export interface AuthStrategy {
  readonly id: AuthStrategyId

  login(input: LoginRequest): Promise<AuthResult>
  signUp(input: RegisterRequest): Promise<AuthResult>
  preAuthenticate?(token: string): Promise<JWTResponse>
  logout(): Promise<void>
  recoverPassword(input: ForgotPasswordRequest): Promise<void>
  resetPassword(input: ResetPasswordRequest): Promise<void>
  changePassword(input: ChangePasswordRequest): Promise<void>
}

export interface SessionMaterial {
  accessToken?: string | null
  refreshToken?: string | null
  sessionToken?: string | null
  strategyData?: Record<string, unknown>
}

export type SessionStatus = (typeof SESSION_STATUS)[keyof typeof SESSION_STATUS]

export interface SessionState<TUser = User> {
  status: SessionStatus
  user: TUser | null
  session: SessionMaterial
}

export interface StrategySession<TUser = User> {
  evaluate(session: SessionMaterial): Promise<SessionState<TUser>>
  refresh(session: SessionMaterial): Promise<SessionState<TUser>>
}

export interface ActiveAuthModule {
  strategy: AuthStrategy
  session: StrategySession
}

export interface SessionContract<TUser = User> {
  isAuthenticated(): Promise<boolean> | boolean
  resolveUser(): Promise<TUser | null> | TUser | null
}

export interface SessionService<TUser = User> extends SessionContract<TUser> {
  read(): Promise<SessionMaterial> | SessionMaterial
  write(session: SessionMaterial): Promise<void>
  clear(reason?: AuthSessionClearedEvent['reason']): Promise<void>
  getState(): Promise<SessionState<TUser>>
  refresh(): Promise<SessionState<TUser>>
  handleUnauthorized(): Promise<SessionState<TUser>>
}

export interface AuthUnauthorizedEvent {
  type: 'AUTH_UNAUTHORIZED'
  source: 'fetch' | 'axios'
  path?: string
  status: 200 | 401
  hasRefreshToken: boolean
  requestId?: string
}

export interface AuthSessionRefreshedEvent {
  type: 'AUTH_SESSION_REFRESHED'
}

export interface AuthSessionClearedEvent {
  type: 'AUTH_SESSION_CLEARED'
  reason: 'refresh_failed' | 'logout' | 'missing_refresh_token'
}

export interface UseAuthOperationResult<TData = AuthResult> {
  submit: (...args: unknown[]) => Promise<TData>
  error: AuthError | null
  isPending: boolean
}
