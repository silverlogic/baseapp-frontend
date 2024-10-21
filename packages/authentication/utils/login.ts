import type {
  LoginChangeExpiredPasswordRedirectResponse,
  LoginMfaResponse,
  LoginResponse,
} from '../types/auth'

export const isLoginMfaResponse = (data: LoginResponse): data is LoginMfaResponse => {
  const mfaKey: keyof LoginMfaResponse = 'method'
  return mfaKey in data
}

export const isLoginChangeExpiredPasswordRedirectResponse = (
  data: LoginResponse,
): data is LoginChangeExpiredPasswordRedirectResponse => {
  const redirectUrl: keyof LoginChangeExpiredPasswordRedirectResponse = 'redirectUrl'
  return redirectUrl in data
}
