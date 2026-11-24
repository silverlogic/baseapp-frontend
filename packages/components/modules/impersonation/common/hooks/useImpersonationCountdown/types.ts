export interface UseImpersonationCountdownOptions {
  /** Called once, when the countdown reaches zero. */
  onExpire?: () => void
}

export interface UseImpersonationCountdownReturn {
  /**
   * Milliseconds left. `null` until the component has mounted (so server and client render the
   * same markup) and when there is no expiry.
   */
  remainingMs: number | null
  /** Whether the expiry has passed. */
  isExpired: boolean
}
