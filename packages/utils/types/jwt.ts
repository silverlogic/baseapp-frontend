import { ACCESS_KEY_NAME, REFRESH_KEY_NAME } from '../constants/jwt'

export interface JWTResponse {
  access: string
  refresh: string
}

export interface JWTContent {
  tokenType: 'access' | 'refresh'
  exp: number
  iat: number
  jti: string
}

export type JWTKey = typeof ACCESS_KEY_NAME | typeof REFRESH_KEY_NAME
