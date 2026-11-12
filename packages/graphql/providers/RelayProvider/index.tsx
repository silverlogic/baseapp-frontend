'use client'

import { FC, Fragment } from 'react'

import { RelayEnvironmentProvider } from 'react-relay'

import { useEnvironment } from '../../config'
import type { RelayProviderProps } from './types'

const SessionRelayProvider: FC<Omit<RelayProviderProps, 'environment'>> = ({
  children,
  sessionKey,
}) => {
  const environment = useEnvironment(sessionKey)

  return (
    <RelayEnvironmentProvider environment={environment}>
      {/* Remount on a session change, so no component state from the old session survives. */}
      <Fragment key={sessionKey}>{children}</Fragment>
    </RelayEnvironmentProvider>
  )
}

/**
 * Provides a Relay environment to its children.
 *
 * @description
 * This is a **BaseApp** feature.
 *
 * If you believe your changes should be in the BaseApp, please read the **CONTRIBUTING.md** guide.
 */
const RelayProvider: FC<RelayProviderProps> = ({ children, environment, sessionKey }) => {
  if (environment) {
    return <RelayEnvironmentProvider environment={environment}>{children}</RelayEnvironmentProvider>
  }

  return <SessionRelayProvider sessionKey={sessionKey}>{children}</SessionRelayProvider>
}

export default RelayProvider
