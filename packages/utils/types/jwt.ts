export interface IJWTResponse {
  access: string
  refresh: string
}

export interface IJWTContent {
  token_type: 'access' | 'refresh'
  exp: number
  iat: number
  jti: string
}
