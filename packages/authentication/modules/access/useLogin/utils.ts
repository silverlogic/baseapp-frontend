import { TokenTypes } from '@baseapp-frontend/utils'

import {
  ILoginJWTResponse,
  ILoginMfaResponse,
  ILoginSimpleTokenResponse,
  LoginResponse,
} from '../../../types/auth'

export const isLoginMfaResponse = (data: LoginResponse): data is ILoginMfaResponse => {
  const mfaKey: keyof ILoginMfaResponse = 'method'
  return mfaKey in data
}

export const isJWTResponse = (
  token: TokenTypes,
  response?: ILoginJWTResponse | ILoginSimpleTokenResponse,
): response is ILoginJWTResponse => token === TokenTypes.jwt
