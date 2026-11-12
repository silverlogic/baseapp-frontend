'use client'

import { useEffect, useState } from 'react'

import type { Environment } from 'relay-runtime'

import { createEnvironment, disposeEnvironment } from '../environment'

type SessionEnvironment = {
  sessionKey?: string
  environment: Environment
}

// The browser's current session environment, kept outside React: a render that suspends before it
// commits loses its state, and a new environment on every retry would refetch (and suspend)
// forever. Never used on the server, where module state would be shared between requests.
let browserSessionEnvironment: { sessionKey: string; environment: Environment } | undefined

const getEnvironment = (sessionKey?: string) => {
  if (sessionKey === undefined || typeof window === typeof undefined) {
    return createEnvironment()
  }
  if (browserSessionEnvironment?.sessionKey !== sessionKey) {
    browserSessionEnvironment = { sessionKey, environment: createEnvironment() }
  }
  return browserSessionEnvironment.environment
}

// Mounted users of each session environment. The last one to unmount schedules the disposal, and
// a mount before it runs (StrictMode's double mount, a remount with the same key, a second provider
// for the same session) cancels it.
const environmentUsers = new Map<
  Environment,
  { count: number; disposal?: ReturnType<typeof setTimeout> }
>()

const retainEnvironment = (environment: Environment) => {
  const users = environmentUsers.get(environment) ?? { count: 0 }
  clearTimeout(users.disposal)
  environmentUsers.set(environment, { count: users.count + 1 })
}

const releaseEnvironment = (environment: Environment) => {
  const users = environmentUsers.get(environment)
  if (!users) return
  users.count -= 1
  if (users.count > 0) return
  users.disposal = setTimeout(() => {
    environmentUsers.delete(environment)
    if (browserSessionEnvironment?.environment === environment) {
      browserSessionEnvironment = undefined
    }
    disposeEnvironment(environment)
  }, 0)
}

/**
 * Returns the Relay environment for this component's lifetime.
 *
 * With a `sessionKey` (see `getSessionIdentity` in `@baseapp-frontend/utils`), the environment
 * belongs to that session: when the key changes, a new environment is returned and the previous one
 * is disposed (`disposeEnvironment`) once the change has been committed, so nothing the old session
 * fetched or subscribed to survives it. The disposal is deferred and cancelled if the environment
 * is mounted again, so StrictMode's double mount never disposes the live environment. In the
 * browser, the current session's environment is kept outside React, so a render that suspends
 * before it commits gets the same environment on retry.
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
    environment: getEnvironment(sessionKey),
  }))

  let current = session
  if (session.sessionKey !== sessionKey) {
    // Adjusting state while rendering: React re-renders right away with the new environment,
    // before anything is committed with the old one.
    current = { sessionKey, environment: getEnvironment(sessionKey) }
    setSession(current)
  }
  const { environment } = current
  const isSessionOwned = sessionKey !== undefined

  useEffect(() => {
    if (!isSessionOwned) return undefined

    retainEnvironment(environment)
    return () => releaseEnvironment(environment)
  }, [environment, isSessionOwned])

  return environment
}

export default useEnvironment
