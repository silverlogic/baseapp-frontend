import { getGraphQLErrorMessage } from '@baseapp-frontend/graphql'
import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { ProfileUserRoleCreateMutation } from '../../../../../__generated__/ProfileUserRoleCreateMutation.graphql'

export const ProfileUserRoleCreateMutationQuery = graphql`
  mutation ProfileUserRoleCreateMutation(
    $input: ProfileUserRoleCreateInput!
    $connections: [ID!]!
  ) {
    profileUserRoleCreate(input: $input) {
      profileUserRoles
        @prependNode(connections: $connections, edgeTypeName: "ProfileUserRoleEdge") {
        id
        status
        role
        ...MemberItemFragment
      }
      errors {
        field
        messages
      }
    }
  }
`

export const useProfileUserRoleCreateMutation = (): [
  (config: UseMutationConfig<ProfileUserRoleCreateMutation>) => Disposable,
  boolean,
] => {
  const { sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<ProfileUserRoleCreateMutation>(
    ProfileUserRoleCreateMutationQuery,
  )

  const commit = (config: UseMutationConfig<ProfileUserRoleCreateMutation>) =>
    commitMutation({
      ...config,
      onError: (error) => {
        // When the caller handles errors (e.g. the invite dialog), let it own the toast
        // so we don't double-toast; otherwise surface a clean, human-friendly message.
        if (config?.onError) {
          config.onError(error)
          return
        }
        sendToast(getGraphQLErrorMessage(error, 'Failed to add members'), { type: 'error' })
      },
    })

  return [commit, isMutationInFlight]
}
