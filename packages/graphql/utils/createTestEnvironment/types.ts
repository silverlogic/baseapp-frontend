import type { MockPayloadGenerator } from 'relay-test-utils'

type MockResolvers = {
  mockResolvers: MockPayloadGenerator.MockResolvers
  data?: never
  queryName?: string
}

type Data = {
  data: any
  mockResolvers?: never
  queryName?: string
}

export type ResolveMostRecentOperationParams = MockResolvers | Data

export type QueueOperationResolverParams = MockResolvers | Data
