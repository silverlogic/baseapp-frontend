import { FC } from 'react'

import { createTestEnvironment } from '../../../../utils'
import RelayTestProvider from '../RelayTestProvider'
import { WithGraphqlTestProvidersProps } from './types'

const withGraphqlTestProviders =
  <Props extends object>(Component: FC<Props>) =>
  ({ environment, context, ...restProps }: Props & WithGraphqlTestProvidersProps) => {
    let currentEnvironment = environment
    const queryName = context?.parameters?.queryName || undefined
    const mockResolvers = context?.parameters?.mockResolvers || undefined
    const mockData = context?.parameters?.mockData || {}

    const relayMockEnvironment = createTestEnvironment()
    const { environment: newEnvironment, queueOperationResolver } = relayMockEnvironment

    if (!environment) {
      queueOperationResolver({ mockResolvers, data: mockData, queryName })
      currentEnvironment = newEnvironment
    }

    if (context && !context.parameters.environment) {
      context.parameters.environment = relayMockEnvironment
    }

    return (
      <RelayTestProvider environment={currentEnvironment}>
        <Component {...(restProps as Props)} />
      </RelayTestProvider>
    )
  }

export default withGraphqlTestProviders
