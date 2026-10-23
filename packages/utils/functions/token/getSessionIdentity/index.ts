import { decodeJWT } from '../decodeJWT'

type SessionIdentityClaims = {
  id?: string | number
  userId?: string | number
  sub?: string
}

/**
 * Identifies who is signed in and which login session they are in, without exposing a token.
 *
 * Returns `<principal>:<refresh token jti>` (`<principal>:access-only` without a decodable refresh
 * token), or `'anonymous'` when there is no access token or it names no principal. The principal is
 * the access token's `id`, else `user_id`, else `sub` claim.
 *
 * The value changes on logout, on login as another user and on a new login as the same user, but
 * not when the access token is refreshed within one session. Use it as the `sessionKey` of
 * `RelayProvider` (`@baseapp-frontend/graphql`) and `ReactQueryProvider`
 * (`@baseapp-frontend/provider`), so cached data never outlives the session that fetched it.
 *
 * @description
 * This is a **BaseApp** feature.
 *
 * If you believe your changes should be in the BaseApp, please read the **CONTRIBUTING.md** guide.
 */
export const getSessionIdentity = (access?: string, refresh?: string): string => {
  if (!access) return 'anonymous'
  const claims = decodeJWT<SessionIdentityClaims>(access)
  const principal = claims?.id ?? claims?.userId ?? claims?.sub
  if (principal === undefined) return 'anonymous'
  const session = refresh ? decodeJWT<{ jti?: string }>(refresh)?.jti : undefined
  return `${principal}:${session ?? 'access-only'}`
}
