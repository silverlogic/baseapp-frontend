export { default as preAuthenticateJWT } from './preAuthenticateJWT'

export { default as useLogin } from './useLogin'
export * from '../../utils/login'
export type * from './useLogin/types'

export { default as useLogout } from './useLogout'
export type * from './useLogout/types'

export { default as useRecoverPassword } from './useRecoverPassword'
export type * from './useRecoverPassword/types'

export { default as useResetPassword } from './useResetPassword'
export type * from './useResetPassword/types'

export { default as useSignUp } from './useSignUp'
export type * from './useSignUp/types'

// AllAuth-specific hooks
export { default as useAllAuthLogin } from './allauth/useAllAuthLogin'
export { default as useAllAuthSignUp } from './allauth/useAllAuthSignUp'
export { default as useAllAuthRecoverPassword } from './allauth/useAllAuthRecoverPassword'
export { default as useAllAuthResetPassword } from './allauth/useAllAuthResetPassword'
export { default as useAllAuthLogout } from './allauth/useAllAuthLogout'
export { default as useAllAuthSession } from './allauth/useAllAuthSession'
export { default as useAllAuthGoogleLogin } from './allauth/useAllAuthGoogleLogin'
export type * from './allauth/useAllAuthGoogleLogin/types'
export { useAllAuthGoogleLoginHandler } from './allauth/useAllAuthGoogleLoginHandler'
export type { UseAllAuthGoogleLoginHandlerOptions } from './allauth/useAllAuthGoogleLoginHandler'
export { extractTokensFromAllAuthResponse, isAllAuthPasswordChangeRedirect } from './allauth/utils'

export { default as useChangePassword } from './useChangePassword'
export type * from './useChangePassword/types'
