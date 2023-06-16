import { ILoginMfaResponse, LoginResponse } from '../../../types/auth'

export const isLoginMfaResponse = (data: LoginResponse): data is ILoginMfaResponse => {
  const mfaKey: keyof ILoginMfaResponse = 'method'
  return mfaKey in data
}
