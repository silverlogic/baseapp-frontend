import humps from 'humps'
import jwt_decode from 'jwt-decode'

export const decodeJWT = <JWTContentType>(token: string) =>
  humps.camelizeKeys(jwt_decode(token)) as JWTContentType
