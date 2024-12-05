import type { RelayMockEnvironment } from 'relay-test-utils/lib/RelayModernMockEnvironment'

export type WithProvidersOptions = {
  environment: RelayMockEnvironment
  [key: string]: any
}
