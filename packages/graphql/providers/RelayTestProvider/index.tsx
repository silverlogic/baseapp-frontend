import { FC } from 'react'

import { RelayEnvironmentProvider } from 'react-relay'

import { RelayTestProviderProps } from './types'

const RelayTestProvider: FC<RelayTestProviderProps> = ({ children, environment }) => (
  <RelayEnvironmentProvider environment={environment}>{children}</RelayEnvironmentProvider>
)

export default RelayTestProvider
