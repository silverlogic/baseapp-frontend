import { getGraphQLErrorMessage } from '@baseapp-frontend/graphql'
import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { SendInvitationMutation } from '../../../../../__generated__/SendInvitationMutation.graphql'

export const SendInvitationMutationQuery = graphql`
  mutation SendInvitationMutation($input: ProfileSendInvitationInput!, $connections: [ID!]!) {
    profileSendInvitation(input: $input) {
      profileUserRoles
        @prependNode(connections: $connections, edgeTypeName: "ProfileUserRoleEdge") {
        id
        status
        role
        invitedEmail
        invitationExpiresAt
        ...MemberItemFragment
      }
      emailsSent
      errors {
        field
        messages
      }
    }
  }
`

export const useSendInvitationMutation = (): [
  (config: UseMutationConfig<SendInvitationMutation>) => Disposable,
  boolean,
] => {
  const { sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<SendInvitationMutation>(
    SendInvitationMutationQuery,
  )

  const commit = (config: UseMutationConfig<SendInvitationMutation>) =>
    commitMutation({
      ...config,
      onError: (error) => {
        // When the caller handles errors (e.g. the invite dialog), let it own the toast
        // so we don't double-toast; otherwise surface a clean, human-friendly message.
        if (config?.onError) {
          config.onError(error)
          return
        }
        sendToast(getGraphQLErrorMessage(error, 'Failed to send invitations'), { type: 'error' })
      },
    })

  return [commit, isMutationInFlight]
}
