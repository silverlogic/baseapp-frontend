import type {
  ImpersonationBanner_user$data,
  ImpersonationBanner_user$key,
} from '../../../../../__generated__/ImpersonationBanner_user.graphql'
import type { UseEndImpersonationOptions } from '../useEndImpersonation/types'

export type ImpersonationBannerSession = NonNullable<ImpersonationBanner_user$data['impersonation']>

export interface UseImpersonationBannerOptions extends UseEndImpersonationOptions {
  /** The current user (`me`). Nothing is shown for `null` or a user outside a session. */
  user: ImpersonationBanner_user$key | null | undefined
  /** End the session, and give the impersonator their tokens back, when it expires. Default true. */
  endOnExpiry?: boolean
}

export interface UseImpersonationBannerReturn {
  /** The impersonated user, as far as the banner reads it. */
  user: ImpersonationBanner_user$data | null | undefined
  /** The running session, or `null` outside one. */
  session: ImpersonationBannerSession | null
  /** Milliseconds left, `null` before mount. */
  remainingMs: number | null
  isExpired: boolean
  endImpersonation: () => void
  isEnding: boolean
}
