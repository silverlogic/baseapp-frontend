// TODO: bring it back after doing BA:1246
// import 'server-only'
import { JWTContent } from '../../../types/jwt'

/**
 * This function should be executed on the server side for security reasons.
 */
export const isUserTokenValid = <UserToken extends JWTContent>(userToken?: UserToken | null) => {
  const isValid = userToken?.exp ? userToken.exp > Date.now() / 1000 : false

  return isValid
}
