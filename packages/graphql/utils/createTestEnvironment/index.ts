import { GraphQLTaggedNode, Variables } from 'react-relay'
import { MockPayloadGenerator, createMockEnvironment } from 'relay-test-utils'
import { MockResolvers } from 'relay-test-utils/lib/RelayMockPayloadGenerator'

import { ResolveMostRecentOperationParams } from './types'

const createTestEnvironment = () => {
  const environment = createMockEnvironment()

  const resolveMostRecentOperation = ({
    mockResolvers,
    data,
  }: ResolveMostRecentOperationParams) => {
    try {
      environment.mock.resolveMostRecentOperation((operationToResolve) => {
        const generatedPayload = mockResolvers
          ? MockPayloadGenerator.generate(operationToResolve, mockResolvers)
          : data

        return generatedPayload
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }

  const rejectMostRecentOperation = (errorMessage: string) => {
    try {
      environment.mock.rejectMostRecentOperation(new Error(errorMessage))
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }

  const queueOperationResolver = (mockResolvers: MockResolvers) => {
    try {
      environment.mock.queueOperationResolver((operation) => {
        // eslint-disable-next-line no-console
        console.log(`react-relay mock: ${operation.request.node.operation.name}`)
        return MockPayloadGenerator.generate(operation, mockResolvers)
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }

  const queuePendingOperation = (operation: GraphQLTaggedNode, variables?: Variables) => {
    try {
      environment.mock.queuePendingOperation(operation, variables ?? {})
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }

  return {
    environment,
    resolveMostRecentOperation,
    rejectMostRecentOperation,
    queueOperationResolver,
    queuePendingOperation,
  }
}

export default createTestEnvironment
