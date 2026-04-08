import { preAuthenticateWithActiveStrategy } from '../../auth-strategy/preAuthenticate'

const preAuthenticateJWT = async (token?: string) => preAuthenticateWithActiveStrategy(token)

export default preAuthenticateJWT
