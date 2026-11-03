import { useState } from 'react'

import { swapInImpersonationTokens } from '@baseapp-frontend/authentication'

import { DEFAULT_IMPERSONATION_REDIRECT_PATH } from '../../constants'
import { useImpersonationStartMutation } from '../../graphql/mutations/ImpersonationStart'
import { reloadAt } from '../../utils'
import type {
  ImpersonationStartSession,
  UseStartImpersonationOptions,
  UseStartImpersonationReturn,
} from './types'

/**
 * Starts an impersonation session: asks the server for the session's tokens, keeps the current
 * user's tokens aside, stores the session's in their place, forgets the current profile and
 * reloads the app as the impersonated user.
 */
const useStartImpersonation = ({
  redirectTo = DEFAULT_IMPERSONATION_REDIRECT_PATH,
  onStarted,
  ...keyNames
}: UseStartImpersonationOptions = {}): UseStartImpersonationReturn => {
  const [commit, isMutationInFlight] = useImpersonationStartMutation()
  const [isSwapping, setIsSwapping] = useState(false)

  const swapIn = async (session: ImpersonationStartSession, access: string, refresh: string) => {
    setIsSwapping(true)
    try {
      await swapInImpersonationTokens({ ...keyNames, access, refresh })
    } finally {
      setIsSwapping(false)
    }

    if (onStarted) {
      onStarted(session)
    } else {
      reloadAt(redirectTo)
    }
  }

  const startImpersonation: UseStartImpersonationReturn['startImpersonation'] = (
    { targetUser, reason },
    callbacks,
  ) => {
    commit({
      variables: { input: { targetUser, reason } },
      onCompleted: (response, errors) => {
        callbacks?.onCompleted?.(response, errors)

        const payload = response.impersonationStart
        if (errors?.length || payload?.errors?.length) return
        if (!payload?.access || !payload.refresh || !payload.session) return

        swapIn(payload.session, payload.access, payload.refresh).catch(() => undefined)
      },
      onError: (error) => {
        callbacks?.onError?.(error)
      },
    })
  }

  return { startImpersonation, isStarting: isMutationInFlight || isSwapping }
}

export default useStartImpersonation
