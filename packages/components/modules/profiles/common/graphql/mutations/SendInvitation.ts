import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { SendInvitationMutation } from '../../../../../__generated__/SendInvitationMutation.graphql'

export const SendInvitationMutationQuery = graphql`
  mutation SendInvitationMutation($input: ProfileSendInvitationInput!) {
    profileSendInvitation(input: $input) {
      profileUserRoles {
        id
        status
        role
        invitedEmail
        invitationExpiresAt
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
        sendToast(error.message, { type: 'error' })
        config?.onError?.(error)
      },
    })

  return [commit, isMutationInFlight]
}
