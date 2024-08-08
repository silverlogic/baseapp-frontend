import { TokenTypes } from '@baseapp-frontend/utils'

import {
  LoginChangeExpiredPasswordRedirectResponse,
  LoginJWTResponse,
  LoginMfaResponse,
  LoginResponse,
  LoginSimpleTokenResponse,
} from '../types/auth'

export const isLoginMfaResponse = (data: LoginResponse): data is LoginMfaResponse => {
  const mfaKey: keyof LoginMfaResponse = 'method'
  return mfaKey in data
}

export const isJWTResponse = (
  token: TokenTypes,
  response?: LoginJWTResponse | LoginSimpleTokenResponse,
): response is LoginJWTResponse => token === TokenTypes.jwt

export const isLoginChangeExpiredPasswordRedirectResponse = (
  data: LoginResponse,
): data is LoginChangeExpiredPasswordRedirectResponse => {
  const redirectUrl: keyof LoginChangeExpiredPasswordRedirectResponse = 'redirectUrl'
  return redirectUrl in data
}
