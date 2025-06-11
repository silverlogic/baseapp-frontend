import React, { useEffect } from 'react'

import { createTestEnvironment } from '@baseapp-frontend/graphql'

import type { StoryContext, StoryFn } from '@storybook/react'
import { Observable, OperationDescriptor } from 'relay-runtime'
import { MockPayloadGenerator } from 'relay-test-utils'
import { MockResolvers } from 'relay-test-utils/lib/RelayMockPayloadGenerator'

export type DynamicMockResolvers = (operation: OperationDescriptor) => MockResolvers

const withMutationResolver = (Story: StoryFn, context: StoryContext) => {
  const { environment, queueOperationResolver } = context.parameters
    .relayMockEnvironment as ReturnType<typeof createTestEnvironment>

  const mockResolvers = context.parameters.mockResolvers || undefined
  const dynamicMockResolvers: DynamicMockResolvers =
    context.parameters.dynamicMockResolvers || undefined
  const mutationError: string = context.parameters.mutationError || undefined

  useEffect(() => {
    const originalExecuteMutation = environment.executeMutation

    environment.executeMutation = (request) => {
      if (!mutationError) {
        if (dynamicMockResolvers) {
          environment.mock.queueOperationResolver(() => {
            return MockPayloadGenerator.generate(
              request.operation,
              dynamicMockResolvers(request.operation),
            )
          })
        } else if (mockResolvers) {
          environment.mock.queueOperationResolver(() => {
            return MockPayloadGenerator.generate(request.operation, mockResolvers)
          })
        }
      }

      const observable = originalExecuteMutation.call(environment, request)

      return Observable.create((sink) => {
        if (mutationError) {
          setTimeout(() => {
            sink.error(new Error(mutationError))
          }, 100)
        } else {
          observable.subscribe({
            complete: () => {
              setTimeout(() => {
                sink.complete()
              }, 100)
            },
          })
        }
      })
    }

    return () => {
      environment.executeMutation = originalExecuteMutation
    }
  }, [environment, queueOperationResolver])

  return Story({}, context)
}

export default withMutationResolver
