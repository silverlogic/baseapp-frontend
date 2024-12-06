// import { MfaMethod } from './mfa'
import { AxiosResponse } from 'axios'

// Settings
export enum Client {
  APP = 'app',
  BROWSER = 'browser',
}

// Config Types

export interface ConfigRequest {}

export interface ConfigResponse {
  status: number
  data: {
    account: {
      authenticationMethod: string
      isOpenForSignup: boolean
      emailVerificationByCodeEnabled: boolean
      loginByCodeEnabled: boolean
    }
    socialaccount: {
      providers: any[]
    }
    mfa: {
      supportedTypes: string[]
      passkeyLoginEnabled: boolean
    }
    usersessions: {
      trackActivity: boolean
    }
  }
}

// Authentication Types

export enum AuthenticationFlowType {
  VERIFY_EMAIL = 'verify_email',
  LOGIN = 'login',
  LOGIN_BY_CODE = 'login_by_code',
  SIGNUP = 'signup',
  PROVIDER_REDIRECT = 'provider_redirect',
  PROVIDER_SIGNUP = 'provider_signup',
  MFA_AUTHENTICATE = 'mfa_authenticate',
  REAUTHENTICATE = 'reauthenticate',
  MFA_REAUTHENTICATE = 'mfa_reauthenticate',
  MFA_WEBAUTHN_SIGNUP = 'mfa_signup_webauthn',
}

export enum AuthenticatorType {
  TOTP = 'totp',
  RECOVERY_CODES = 'recovery_codes',
  WEBAUTHN = 'webauthn',
}

// Session Types

export interface SessionResponseDataUser {
  id: number
  display: string
  hasUsablePassword: boolean
  email: string
}

export interface SessionResponseDataMethod {
  method: 'password' | 'socialaccount' | 'mfa'
  at: number
  id?: number
  email?: string
  username?: string
  reauthenticated?: boolean
  provider?: string
  uid?: string
  type?: 'recovery_codes' | 'totp' | 'webauthn'
}

export interface SessionResponseMetaJWTAccessToken {
  refresh: string
  access: string
}

export type SessionResponseMetaSimpleAccessToken = string

export interface SessionResponseMeta {
  isAuthenticated: boolean
  recoveryCodesGenerated?: boolean
  sessionToken?: string
  accessToken?: SessionResponseMetaJWTAccessToken
}

export interface SessionResponseAuthFlow {
  id: AuthenticationFlowType
  isPending?: boolean
}

export interface SessionResponseAuthenticated {
  status: 200
  data: {
    user: SessionResponseDataUser
    methods: SessionResponseDataMethod[]
  }
  meta: SessionResponseMeta
}

export interface SessionResponseNotAuthenticated {
  status: 401
  data: {
    flows: Array<SessionResponseAuthFlow>
  }
  meta: SessionResponseMeta
}

export interface SessionResponseInvalid {
  status: 410
  data: {
    flows: SessionResponseAuthFlow[]
  }
  meta: SessionResponseMeta
}

export type SessionResponse =
  | SessionResponseAuthenticated
  | SessionResponseNotAuthenticated
  | SessionResponseInvalid

export interface EndSessionsRequest {
  sessions: Array<number>
}

export interface Session {
  userAgent: string
  ip: string
  createdAt: number
  isCurrent: true
  id: number
}

export interface SessionsResponse {
  status: 200
  data: Array<Session>
}

export interface SessionInfo {
  // Inferred
  isAuthenticated: boolean
  user: SessionResponseDataUser | null
  requiresReauthentication: boolean
  pendingFlow: SessionResponseAuthFlow | null
  // Explicit
  response: AxiosResponse<SessionResponse, any>
}

interface GetSessionMeta {
  is_authenticated: boolean
  recovery_codes_generated?: boolean
  session_token?: string
  access_token?: string
}

interface BaseGetSessionResponse {
  meta?: GetSessionMeta
}

interface GetSessionSuccessResponseUser {
  id: number | string
  display: string
  has_usable_password: boolean
  email: string
  username: string
}

interface GetSessionSuccessResponseMethod {
  method: 'password' | 'socialaccount' | 'mfa'
  at: number
  email?: string
  username?: string
  reauthenticated?: boolean
  provider?: string
  uid?: string
  type?: 'recovery_codes' | 'totp'
}

interface GetSessionSuccessResponseData {
  user: GetSessionSuccessResponseUser
  methods: GetSessionSuccessResponseMethod[]
}

export interface GetSessionSuccessResponse extends BaseGetSessionResponse {
  status: 200
  data: GetSessionSuccessResponseData
}

interface AuthenticationProvider {
  id: string
  name: string
  clientId: string
  flows: Array<'provider_redirect' | 'provider_token'>
}

interface AuthenticationFlow {
  id: AuthenticationFlowType
  provider: AuthenticationProvider
  isPending: boolean
}

interface GetSessionNotAuthenticatedResponseData {
  flows: AuthenticationFlow[]
}

export interface GetSessionNotAuthenticatedResponse extends BaseGetSessionResponse {
  status: 401
  data: GetSessionNotAuthenticatedResponseData
}

export interface GetSessionInvalidSessionResponse extends BaseGetSessionResponse {
  status: 410
  data: GetSessionNotAuthenticatedResponseData
}

export interface AuthenticatorsTOTPData {
  type: 'totp'
  createdAt: number
  lastUsedAt: number | null
}

export interface AuthenticatorsRecoveryCodesData {
  type: 'recovery_codes'
  createdAt: number
  lastUsedAt: number | null
  totalCodeCount: number
  unusedCodeCount: number
  unusedCodes: string[]
}

export interface AuthenticatorsResponse {
  status: 200
  data: Array<AuthenticatorsTOTPData | AuthenticatorsRecoveryCodesData /* TODO: Passkey Type */>
}

export interface TOTPAuthenticatorSuccessData {
  data: AuthenticatorsTOTPData
}

export interface TOTPAuthenticatorNotFoundMeta {
  secret: string
  totpUrl: string
}

export interface TOTPAuthenticatorResponse {
  status: 200
  data: TOTPAuthenticatorSuccessData
}

export interface TOTPAuthenticatorNotFoundResponse {
  status: 404
  meta: TOTPAuthenticatorNotFoundMeta
}

export interface TOTPAuthenticatorConflictResponse {
  status: 409
}

export interface ActivateTOTPAuthenticatorRequest {
  code: string
}

export type ActivateTOTPAuthenticatorResponse = TOTPAuthenticatorResponse

export interface DeactivateTOTPAuthenticatorResponse {
  status: 200
}

export interface RecoveryCodesData {
  type: 'recovery_codes'
  createdAt: number
  lastUsedAt: number | null
  totalCodeCount: number
  unusedCodeCount: number
  unusedCodes: string[]
}

export interface RecoveryCodesResponse {
  status: 200
  data: RecoveryCodesData
}

// // Auth: Basics
export interface LoginRequest {
  email: string
  password: string
}

export interface RequestLoginEmailCodeRequest {
  email: string
}

export interface ConfirmLoginEmailCodeRequest {
  code: string
}

export interface ReauthenticateRequest {
  password: string
}

export interface RequestPasswordResetRequest {
  email: string
}

export interface RequestPasswordResetResponse {
  status: 200
}

export interface GetPasswordResetInfoRequest {
  key: string
}

export interface GetPasswordResetInfoResponse {
  status: 200
  data: {
    user: SessionResponseDataUser
  }
}

export interface GetPasswordResetResponse {
  status: 200
}

export interface ResetPasswordRequest {
  key: string
  password: string
}

export interface SignUpRequest {
  email: string
  password: string
}

export interface GetVerifyEmailInfoRequest {
  key: string
}

export interface GetVerifyEmailInfoResponse {
  status: 200
  data: {
    email: string
    user: SessionResponseDataUser
  }
  meta: {
    isAuthenticating: boolean
  }
}

export interface VerifyEmailRequest {
  key: string
}

// // Auth: 2FA

export interface TOTPAuthenticateRequest {
  code: string
}

export type TOTPReauthenticateRequest = TOTPAuthenticateRequest

export interface RecoveryCodeAuthenticateRequest {
  code: string
}

export type RecoveryCodeReauthenticateRequest = RecoveryCodeAuthenticateRequest

export interface SignupWebAuthnRequest {
  email: string
  username: string
}

export interface CreateWebAuthnAuthenticatorOptionsRequest {
  passwordless: boolean
}

export interface CreateWebAuthnAuthenticatorOptionsResponseData {
  creationOptions: {
    status: 200
    data: {
      requestOptions: {
        publicKey: {
          challenge: string
          rpId: string
          allowCredentials: any[]
          userVerification: 'required' | 'preferred' | 'discouraged'
        }
      }
    }
  }
}

export interface WebAuthnPublicKeyCredentialDescriptorSchema {
  type: string
  id: string
  transports: string[]
}

export interface CreateWebAuthnAuthenticatorOptionsResponse {
  status: number
  data: CreateWebAuthnAuthenticatorOptionsResponseData
}

export interface LoginWebAuthnOptionsResponse {
  status: number
  data: {
    requestOptions: {
      publicKey: {
        challenge: string
        rpId: string
        allowCredentials: any[]
        userVerification: 'required' | 'preferred' | 'discouraged'
      }
    }
  }
  meta?: SessionResponseMeta
}

export interface AddWebAuthnCredentialRequest {
  name: string
  credential: object // WebAuthnCredential type.
}

export interface AddWebAuthnCredentialResponse {
  status: 200
  data: WebAuthnResponseData
  meta: {
    recoveryCodesGenerated: boolean
  }
}

export interface UpdateWebAuthnCredentialRequest {
  id: number
  name: string
}

export interface UpdateWebAuthnCredentialResponse {
  status: 200
  data: WebAuthnResponseData
}

export interface DeleteWebAuthnCredentialRequest {
  authenticators: Array<number>
}

export interface DeleteWebAuthnCredentialResponse {
  status: 200
}

export interface WebAuthnResponseData {
  lastUsedAt: number
  createdAt: number
  type: string
  id: number
  name: string
  isPasswordless: boolean
}

export interface LoginWebAuthnRequest {
  credential: object // WebAuthnCredential type
}

export type LoginWebAuthnResponse = SessionInfo

export interface AllAuthError {
  message: string
  cose: string
  param: string
}

export interface BadRequestResponse {
  status: 400
  errors: Array<AllAuthError>
}

export interface ConflictResponse {
  status: 409
}

export interface ForbiddenResponse {
  status: 403
}

export interface NotFoundResponse {
  status: 404
}
