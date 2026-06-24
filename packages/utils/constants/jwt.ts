export const ACCESS_KEY_NAME = 'Authorization'
export const REFRESH_KEY_NAME = 'Refresh'
export const SESSION_TOKEN_KEY_NAME = 'SessionToken'

/**
 * Cookie/secure-store key for the persisted authenticated user. With allauth the
 * access token carries no identity, so the user is captured from the auth
 * response and stored here instead of being decoded from the token.
 */
export const CURRENT_USER_KEY_NAME = 'CurrentUser'
