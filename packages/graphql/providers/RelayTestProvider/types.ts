import { PropsWithChildren } from 'react'

import type { RelayMockEnvironment } from 'relay-test-utils/lib/RelayModernMockEnvironment'

export interface RelayTestProviderProps extends PropsWithChildren {
  environment: RelayMockEnvironment
}
