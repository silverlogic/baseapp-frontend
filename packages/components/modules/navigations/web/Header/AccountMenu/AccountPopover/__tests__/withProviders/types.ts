import type { MinimalProfile } from '@baseapp-frontend/authentication'

import type { RelayMockEnvironment } from 'relay-test-utils/lib/RelayModernMockEnvironment'

export type WithProvidersOptions = {
  environment: RelayMockEnvironment
  initialProfile: MinimalProfile | null
}
