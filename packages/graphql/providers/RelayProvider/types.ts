import type { PropsWithChildren } from 'react'

import type { Environment } from 'relay-runtime'

export interface RelayProviderProps extends PropsWithChildren {
  /**
   * Names the session the environment belongs to, e.g. `getSessionIdentity(access, refresh)` from
   * `@baseapp-frontend/utils`. When it changes, the children get a new, empty environment and are
   * remounted, and the previous environment is disposed. Leave it out to keep one environment for
   * the provider's lifetime.
   */
  sessionKey?: string
  /**
   * An environment you create and own; `sessionKey` is then ignored and the provider never disposes
   * it.
   */
  environment?: Environment
}
