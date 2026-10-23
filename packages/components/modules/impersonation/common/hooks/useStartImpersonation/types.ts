import type { ImpersonationTokenKeyNames } from '@baseapp-frontend/authentication'

import type { PayloadError } from 'relay-runtime'

import type {
  ImpersonationStartInput,
  ImpersonationStartMutation$data,
} from '../../../../../__generated__/ImpersonationStartMutation.graphql'

export type ImpersonationStartSession = NonNullable<
  NonNullable<ImpersonationStartMutation$data['impersonationStart']>['session']
>

export interface UseStartImpersonationOptions extends ImpersonationTokenKeyNames {
  /**
   * Where to load the app once the session's tokens are in place. Defaults to `/`. Ignored when
   * `onStarted` is given.
   */
  redirectTo?: string
  /**
   * Called once the session's tokens are in place, instead of reloading the app at `redirectTo`.
   * Everything cached for the impersonator (the Relay store, React Query) is stale by then: reload
   * or recreate it. Native apps must pass this.
   */
  onStarted?: (session: ImpersonationStartSession) => void
}

export interface StartImpersonationCallbacks {
  /**
   * Called with the server's answer, before the tokens are swapped. Map
   * `response.impersonationStart.errors` onto a form here; when there are any, or no tokens came
   * back, nothing is swapped.
   */
  onCompleted?: (
    response: ImpersonationStartMutation$data,
    errors: PayloadError[] | null | undefined,
  ) => void
  /** Called when the request fails. The error was already toasted. */
  onError?: (error: Error) => void
}

export interface UseStartImpersonationReturn {
  /** Starts a session as `input.targetUser` (a user's relay id), for `input.reason`. */
  startImpersonation: (
    input: Omit<ImpersonationStartInput, 'clientMutationId'>,
    callbacks?: StartImpersonationCallbacks,
  ) => void
  /** True from the request until the tokens are swapped. */
  isStarting: boolean
}
