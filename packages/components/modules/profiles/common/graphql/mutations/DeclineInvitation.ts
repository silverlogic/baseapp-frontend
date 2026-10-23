import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { DeclineInvitationMutation } from '../../../../../__generated__/DeclineInvitationMutation.graphql'

export const DeclineInvitationMutationQuery = graphql`
  mutation DeclineInvitationMutation($input: ProfileDeclineInvitationInput!) {
    profileDeclineInvitation(input: $input) {
      success
      errors {
        field
        messages
      }
    }
  }
`

/** Decline an invitation as the signed-in user. */
export const useDeclineInvitationMutation = (): [
  (config: UseMutationConfig<DeclineInvitationMutation>) => Disposable,
  boolean,
] => {
  const { sendMutationErrorToast, sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<DeclineInvitationMutation>(
    DeclineInvitationMutationQuery,
  )

  const commit = (config: UseMutationConfig<DeclineInvitationMutation>) =>
    commitMutation({
      ...config,
      onCompleted: (response, errors) => {
        sendMutationErrorToast(response?.profileDeclineInvitation?.errors, errors, {
          defaultMessage: 'Invitation could not be declined',
        })
        config?.onCompleted?.(response, errors)
      },
      onError: (error) => {
        sendToast(error.message, { type: 'error' })
        config?.onError?.(error)
      },
    })

  return [commit, isMutationInFlight]
}
