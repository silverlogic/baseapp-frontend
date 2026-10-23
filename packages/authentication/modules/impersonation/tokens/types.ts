import type { CustomJWTKeyNames } from '../../../types/auth'

export interface ImpersonationTokenKeyNames extends CustomJWTKeyNames {
  /** Where the impersonator's access token is kept during a session. */
  impersonatorAccessKeyName?: string
  /** Where the impersonator's refresh token is kept during a session. */
  impersonatorRefreshKeyName?: string
}

export interface SwapInImpersonationTokensParams extends ImpersonationTokenKeyNames {
  /** The session's access token, as returned by `impersonationStart`. */
  access: string
  /** The session's refresh token, as returned by `impersonationStart`. */
  refresh: string
}
