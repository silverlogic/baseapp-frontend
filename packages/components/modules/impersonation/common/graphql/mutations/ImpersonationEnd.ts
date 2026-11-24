import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { ImpersonationEndMutation } from '../../../../../__generated__/ImpersonationEndMutation.graphql'

export const ImpersonationEndMutationQuery = graphql`
  mutation ImpersonationEndMutation($input: ImpersonationEndInput!) {
    impersonationEnd(input: $input) {
      session {
        id
        isActive
        endedAt
        endReason
      }
      errors {
        field
        messages
      }
    }
  }
`

/**
 * Ends an impersonation session. Unlike the module's other mutation hooks it doesn't toast its
 * errors: `useEndImpersonation` gives the impersonator their own tokens back whatever the server
 * answers (a session that expired or was revoked can't be ended twice), so an error here is not
 * something the user has to act on.
 */
export const useImpersonationEndMutation = (): [
  (config: UseMutationConfig<ImpersonationEndMutation>) => Disposable,
  boolean,
] => {
  const [commitMutation, isMutationInFlight] = useMutation<ImpersonationEndMutation>(
    ImpersonationEndMutationQuery,
  )

  return [commitMutation, isMutationInFlight]
}
