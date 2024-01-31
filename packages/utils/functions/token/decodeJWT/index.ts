import humps from 'humps'
import jwt_decode from 'jwt-decode'

export const decodeJWT = <JWTContentType>(token: string) => {
  try {
    return humps.camelizeKeys(jwt_decode(token)) as JWTContentType
  } catch (error) {
    // If the token has an invalid format, jwt_decode throws an error
    return null
  }
}
