export { useSession } from './modules/user/useSession'
export { default as useCurrentUser } from './modules/user/useCurrentUser'
export { default as useUpdateUser } from './modules/user/useUpdateUser'

export { default as useLogin } from './modules/access/useLogin'
export { default as useLogout } from './modules/access/useLogout'
export { default as useRecoverPassword } from './modules/access/useRecoverPassword'
export { default as useResetPassword } from './modules/access/useResetPassword'
export { default as useSignUp } from './modules/access/useSignUp'
export { default as useChangePassword } from './modules/access/useChangePassword'
export { default as useAllAuthGoogleLogin } from './modules/access/allauth/useAllAuthGoogleLogin'
export { useAllAuthGoogleLoginHandler } from './modules/access/allauth/useAllAuthGoogleLoginHandler'

export {
  default as useCurrentProfile,
  CurrentProfileProvider,
} from './modules/profile/useCurrentProfile'

export { handleClientUnauthorized, refreshClientSession } from './session/client'

export { SESSION_STATUS } from './modules/auth-strategy/constants'

export type * from './modules/access/useLogin/types'
export type * from './modules/access/useLogout/types'
export type * from './modules/access/useRecoverPassword/types'
export type * from './modules/access/useResetPassword/types'
export type * from './modules/access/useSignUp/types'
export type * from './modules/access/useChangePassword/types'
export type * from './modules/access/allauth/useAllAuthGoogleLogin/types'
export type { UseAllAuthGoogleLoginHandlerOptions } from './modules/access/allauth/useAllAuthGoogleLoginHandler'
export type { SessionState, SessionStatus } from './modules/auth-strategy/types'
export { isAuthError } from './modules/auth-strategy/types'
