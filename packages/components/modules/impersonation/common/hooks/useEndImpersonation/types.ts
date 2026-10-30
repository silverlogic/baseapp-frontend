import type { ImpersonationTokenKeyNames } from '@baseapp-frontend/authentication'

export interface ImpersonationEndedResult {
  /**
   * True when the impersonator's own tokens are in place: put back now, or already put back by
   * another tab that ended the session first (then no request is made). False when none were kept
   * aside (for example the session was started in another browser): the session's tokens were
   * removed and the user is logged out.
   */
  restored: boolean
}

export interface UseEndImpersonationOptions extends ImpersonationTokenKeyNames {
  /**
   * Where to load the app once the impersonator's tokens are back. Defaults to `/`. Ignored when
   * `onEnded` is given.
   */
  redirectTo?: string
  /**
   * Called once the tokens are swapped back, instead of reloading the app at `redirectTo`.
   * Everything cached for the impersonated user is stale by then: reload or recreate it. Native
   * apps must pass this.
   */
  onEnded?: (result: ImpersonationEndedResult) => void
  /**
   * Called when no tokens were kept aside and the user was logged out, before `onEnded` or the
   * reload. `LOGOUT_EVENT` is broadcast as well.
   */
  onLogout?: () => void
}

export interface UseEndImpersonationReturn {
  /**
   * Ends the current session on the server and puts the impersonator's tokens back. The tokens
   * are put back whatever the server answers, so the impersonator is never left signed in as
   * someone else.
   */
  endImpersonation: () => void
  /** True from the call until the tokens are swapped back. */
  isEnding: boolean
}
