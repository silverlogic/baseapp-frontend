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
