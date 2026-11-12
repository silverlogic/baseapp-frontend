import { useRef, useState } from 'react'

import {
  isImpersonationSessionToken,
  restoreImpersonatorTokens,
} from '@baseapp-frontend/authentication'
import {
  ACCESS_KEY_NAME,
  LOGOUT_EVENT,
  REFRESH_KEY_NAME,
  broadcastEvent,
  getToken,
  removeTokenAsync,
} from '@baseapp-frontend/utils'

import { DEFAULT_IMPERSONATION_REDIRECT_PATH } from '../../constants'
import { useImpersonationEndMutation } from '../../graphql/mutations/ImpersonationEnd'
import { isSessionTokenUnusable, reloadAt } from '../../utils'
import type {
  ImpersonationEndedResult,
  UseEndImpersonationOptions,
  UseEndImpersonationReturn,
} from './types'

/**
 * Ends the current impersonation session: tells the server, puts the impersonator's own tokens
 * back, forgets the current profile and reloads the app as the impersonator. Without kept-aside
 * tokens it logs out instead. When the session was already ended elsewhere (another tab: the
 * tokens are shared) it only reloads.
 */
const useEndImpersonation = ({
  redirectTo = DEFAULT_IMPERSONATION_REDIRECT_PATH,
  onEnded,
  onLogout,
  ...keyNames
}: UseEndImpersonationOptions = {}): UseEndImpersonationReturn => {
  const { accessKeyName = ACCESS_KEY_NAME, refreshKeyName = REFRESH_KEY_NAME } = keyNames
  const [commit, isMutationInFlight] = useImpersonationEndMutation()
  const [isRestoring, setIsRestoring] = useState(false)
  // the banner may call this from a button and from its countdown at the same time
  const isEndingRef = useRef(false)

  const complete = (result: ImpersonationEndedResult) => {
    if (onEnded) {
      onEnded(result)
    } else {
      reloadAt(redirectTo)
    }
  }

  const finish = async () => {
    setIsRestoring(true)
    let restored = false
    try {
      restored = await restoreImpersonatorTokens(keyNames)
      if (!restored) {
        await removeTokenAsync(accessKeyName)
        await removeTokenAsync(refreshKeyName)
        onLogout?.()
        broadcastEvent(LOGOUT_EVENT)
      }
    } finally {
      setIsRestoring(false)
      isEndingRef.current = false
    }

    complete({ restored })
  }

  const endImpersonation = () => {
    if (isEndingRef.current) return
    isEndingRef.current = true

    const access = getToken(accessKeyName)
    const refresh = getToken(refreshKeyName)
    const isInSession = isImpersonationSessionToken(access) || isImpersonationSessionToken(refresh)

    // The tokens are shared by every tab, so another tab may have ended the session already and
    // put the impersonator's tokens back. There is nothing left to end or restore: a request would
    // be made as the impersonator, and logging out would sign them out everywhere.
    if (!isInSession && (access || refresh)) {
      isEndingRef.current = false
      complete({ restored: true })
      return
    }

    // An expired session can't be ended, and a request with its tokens would fail to refresh and
    // log the user out before the impersonator's tokens are back. Without any tokens there is no
    // session to send either.
    if (!isInSession || isSessionTokenUnusable(refresh)) {
      finish().catch(() => undefined)
      return
    }

    commit({
      variables: { input: {} },
      onCompleted: () => {
        finish().catch(() => undefined)
      },
      onError: () => {
        finish().catch(() => undefined)
      },
    })
  }

  return { endImpersonation, isEnding: isMutationInFlight || isRestoring }
}

export default useEndImpersonation
