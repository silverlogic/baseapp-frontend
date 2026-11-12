export const ACCESS_KEY_NAME = 'Authorization'
export const REFRESH_KEY_NAME = 'Refresh'

// Where the impersonator's own tokens are kept while an impersonation session runs. The session's
// tokens take the regular names, so every request is made as the impersonated user; ending the
// session puts these back.
export const IMPERSONATOR_ACCESS_KEY_NAME = 'ImpersonatorAuthorization'
export const IMPERSONATOR_REFRESH_KEY_NAME = 'ImpersonatorRefresh'
