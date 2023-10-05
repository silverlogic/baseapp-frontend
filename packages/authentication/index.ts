export * from './modules/access'
export * from './modules/mfa'
export * from './modules/user'

export { default as AuthApi } from './services/auth'
export { default as MfaApi } from './services/mfa'
export * from './services/mfa'
export { default as UserApi } from './services/user'
export * from './services/user'

export type {
  ILoginMfaRequest,
  ILoginMfaResponse,
  ILoginSimpleTokenResponse,
  ILoginRequest,
  LoginResponse,
  IForgotPasswordRequest,
  IResetPasswordRequest,
  IRegisterRequest,
  ICookieName,
} from './types/auth'
export type {
  IMfaActivationResponse,
  IMfaActiveMethodResponse,
  IMfaConfigurationResponse,
  IMfaConfirmationResponse,
  IMfaDeactivateRequest,
  IMfaRequest,
  MfaActivationEmailRequest,
  MfaActivationPhoneRequest,
  MfaMethod,
} from './types/mfa'
export type { IUser } from './types/user'
