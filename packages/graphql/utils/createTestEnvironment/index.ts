import { MockPayloadGenerator, createMockEnvironment } from 'relay-test-utils'

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

  return { environment, resolveMostRecentOperation, rejectMostRecentOperation }
}

export default createTestEnvironment
