'use client'

import { useEffect, useRef, useState } from 'react'

import type { Environment } from 'relay-runtime'

import { createEnvironment, disposeEnvironment } from '../environment'

type SessionEnvironment = {
  sessionKey?: string
  environment: Environment
}

/**
 * Returns the Relay environment for this component's lifetime.
 *
 * With a `sessionKey` (see `getSessionIdentity` in `@baseapp-frontend/utils`), the environment
 * belongs to that session: when the key changes, a new environment is returned and the previous one
 * is disposed (`disposeEnvironment`) once the change has been committed, so nothing the old session
 * fetched or subscribed to survives it. The disposal is deferred and cancelled if the same
 * environment is mounted again, so StrictMode's double mount never disposes the live environment.
 *
 * Without a `sessionKey`, one environment is kept for as long as the component is mounted and is
 * never disposed, as before. On the server, every render gets a new environment.
 *
 * @description
 * This is a **BaseApp** feature.
 *
 * If you believe your changes should be in the BaseApp, please read the **CONTRIBUTING.md** guide.
 */
const useEnvironment = (sessionKey?: string) => {
  const [session, setSession] = useState<SessionEnvironment>(() => ({
    sessionKey,
    environment: createEnvironment(),
  }))

  let current = session
  if (session.sessionKey !== sessionKey) {
    // Adjusting state while rendering: React re-renders right away with the new environment,
    // before anything is committed with the old one.
    current = { sessionKey, environment: createEnvironment() }
    setSession(current)
  }
  const { environment } = current

  // The pending disposal remembers its environment, so it's cancelled only when that same
  // environment mounts again (StrictMode), never by the environment that replaces it.
  const pendingDisposal = useRef<{
    environment: Environment
    timeout: ReturnType<typeof setTimeout>
  } | null>(null)
  const isSessionOwned = sessionKey !== undefined

  useEffect(() => {
    if (!isSessionOwned) return undefined

    if (pendingDisposal.current?.environment === environment) {
      clearTimeout(pendingDisposal.current.timeout)
      pendingDisposal.current = null
    }

    return () => {
      pendingDisposal.current = {
        environment,
        timeout: setTimeout(() => disposeEnvironment(environment), 0),
      }
    }
  }, [environment, isSessionOwned])

  return environment
}

export default useEnvironment
