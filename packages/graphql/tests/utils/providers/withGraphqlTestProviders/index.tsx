import { FC } from 'react'

import { createTestEnvironment } from '../../../../utils'
import RelayTestProvider from '../RelayTestProvider'
import { WithGraphqlTestProvidersProps } from './types'

const withGraphqlTestProviders =
  <Props extends object>(Component: FC<Props>) =>
  (props: Props & WithGraphqlTestProvidersProps) => {
    const { environment, ...restProps } = props
    let currentEnvironment = environment
    const queryName = props?.context?.parameters?.queryName || undefined
    const mockResolvers = props?.context?.parameters?.mockResolvers || undefined
    const mockData = props?.context?.parameters?.mockData || {}

    const relayMockEnvironment = createTestEnvironment()
    const { environment: newEnvironment, queueOperationResolver } = relayMockEnvironment

    if (!environment) {
      queueOperationResolver({ mockResolvers, data: mockData, queryName })
      currentEnvironment = newEnvironment
    }

    return (
      <RelayTestProvider environment={currentEnvironment}>
        <Component {...(restProps as Props)} />
      </RelayTestProvider>
    )
  }

export default withGraphqlTestProviders
