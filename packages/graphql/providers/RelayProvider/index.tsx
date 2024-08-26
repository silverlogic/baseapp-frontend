'use client'

import { FC, PropsWithChildren } from 'react'

import { RelayEnvironmentProvider } from 'react-relay'

import { useEnvironment } from '../../config'

const RelayProvider: FC<PropsWithChildren> = ({ children }) => {
  const environment = useEnvironment()

  return <RelayEnvironmentProvider environment={environment}>{children}</RelayEnvironmentProvider>
}

export default RelayProvider
