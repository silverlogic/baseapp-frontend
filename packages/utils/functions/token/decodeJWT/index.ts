import humps from 'humps'
import jwt_decode from 'jwt-decode'

export const decodeJWT = <JWTContentType>(token: string) =>
  humps.camelizeKeys<JWTContentType>(jwt_decode(token))
