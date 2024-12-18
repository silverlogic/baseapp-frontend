import { MockPayloadGenerator, createMockEnvironment } from 'relay-test-utils'

import { QueueOperationResolverParams, ResolveMostRecentOperationParams } from './types'

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

  const queueOperationResolver = ({
    mockResolvers,
    data,
    queryName,
  }: QueueOperationResolverParams) => {
    try {
      console.log('queueOperationResolver', mockResolvers, data, queryName)
      environment.mock.queueOperationResolver((operationToResolve) => {
        console.log('AOPS', operationToResolve)
        if (mockResolvers) {
          console.log('mockResolvers', mockResolvers)

          return MockPayloadGenerator.generate(operationToResolve, mockResolvers)
        }

        // return the data mock if no queryName is provided
        if (data && !queryName) return data

        // return the data mock if the queryName is provided and the operation matches
        if (queryName && operationToResolve.fragment.node.name === queryName) {
          return data
        }

        console.warn('The operation was not mocked.')
        return null
      })
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
  }
}

export default createTestEnvironment
