import { PropsWithChildren } from 'react'

import type { MockResolvers } from 'relay-test-utils/lib/RelayMockPayloadGenerator'

export interface RelayTestProviderProps extends PropsWithChildren {
  mockResolvers?: MockResolvers
}
