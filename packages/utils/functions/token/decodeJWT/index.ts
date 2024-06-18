import humps from 'humps'
import { jwtDecode } from 'jwt-decode'

export const decodeJWT = <TJWTContent>(token: string) => {
  try {
    return humps.camelizeKeys(jwtDecode(token)) as TJWTContent
  } catch (error) {
    // If the token has an invalid format, jwt_decode throws an error
    return null
  }
}
