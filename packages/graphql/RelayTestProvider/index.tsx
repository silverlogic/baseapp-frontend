import { FC, useEffect, useState } from 'react'

import { RelayEnvironmentProvider } from 'react-relay'
import { MockPayloadGenerator, createMockEnvironment } from 'relay-test-utils'
import { RelayMockEnvironment } from 'relay-test-utils/lib/RelayModernMockEnvironment'

import { RelayTestProviderProps } from './types'

const RelayTestProvider: FC<RelayTestProviderProps> = ({ children, mockResolvers = {} }) => {
  const [environment] = useState<RelayMockEnvironment>(() => createMockEnvironment())

  useEffect(() => {
    try {
      environment.mock.resolveMostRecentOperation((operation) => {
        const generatedPayload = MockPayloadGenerator.generate(operation, mockResolvers)
        return generatedPayload
      })
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
    }
  }, [environment, mockResolvers])

  return <RelayEnvironmentProvider environment={environment}>{children}</RelayEnvironmentProvider>
}

export default RelayTestProvider
