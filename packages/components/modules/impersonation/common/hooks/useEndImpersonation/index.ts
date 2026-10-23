import { useRef, useState } from 'react'

import { restoreImpersonatorTokens } from '@baseapp-frontend/authentication'
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
import type { UseEndImpersonationOptions, UseEndImpersonationReturn } from './types'

/**
 * Ends the current impersonation session: tells the server, puts the impersonator's own tokens
 * back, forgets the current profile and reloads the app as the impersonator. Without kept-aside
 * tokens it logs out instead.
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

    if (onEnded) {
      onEnded({ restored })
    } else {
      reloadAt(redirectTo)
    }
  }

  const endImpersonation = () => {
    if (isEndingRef.current) return
    isEndingRef.current = true

    // An expired session can't be ended, and a request with its tokens would fail to refresh and
    // log the user out before the impersonator's tokens are back.
    if (isSessionTokenUnusable(getToken(refreshKeyName))) {
      finish()
      return
    }

    commit({
      variables: { input: {} },
      onCompleted: () => {
        finish()
      },
      onError: () => {
        finish()
      },
    })
  }

  return { endImpersonation, isEnding: isMutationInFlight || isRestoring }
}

export default useEndImpersonation
