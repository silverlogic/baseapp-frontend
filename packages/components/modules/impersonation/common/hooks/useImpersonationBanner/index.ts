import { useFragment } from 'react-relay'

import { ImpersonationBanner_user$key } from '../../../../../__generated__/ImpersonationBanner_user.graphql'
import { ImpersonationBannerFragment } from '../../graphql/fragments/ImpersonationBanner'
import useEndImpersonation from '../useEndImpersonation'
import useImpersonationCountdown from '../useImpersonationCountdown'
import type { UseImpersonationBannerOptions, UseImpersonationBannerReturn } from './types'

/** Everything an impersonation banner shows and does, for the web and native banners alike. */
const useImpersonationBanner = ({
  user: userRef,
  endOnExpiry = true,
  ...endOptions
}: UseImpersonationBannerOptions): UseImpersonationBannerReturn => {
  const user = useFragment<ImpersonationBanner_user$key>(ImpersonationBannerFragment, userRef)
  const session = user?.impersonation ?? null
  const { endImpersonation, isEnding } = useEndImpersonation(endOptions)
  const { remainingMs, isExpired } = useImpersonationCountdown(session?.expiresAt, {
    onExpire: endOnExpiry && session ? endImpersonation : undefined,
  })

  return { user, session, remainingMs, isExpired, endImpersonation, isEnding }
}

export default useImpersonationBanner
