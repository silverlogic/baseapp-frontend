import type { MockPayloadGenerator } from 'relay-test-utils'

type MockResolvers = {
  mockResolvers: MockPayloadGenerator.MockResolvers
  data?: never
}

type Data = {
  data: any
  mockResolvers?: never
}

export type ResolveMostRecentOperationParams = MockResolvers | Data
