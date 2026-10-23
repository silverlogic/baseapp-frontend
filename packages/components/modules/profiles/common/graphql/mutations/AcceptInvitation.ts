import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { AcceptInvitationMutation } from '../../../../../__generated__/AcceptInvitationMutation.graphql'

export const AcceptInvitationMutationQuery = graphql`
  mutation AcceptInvitationMutation($input: ProfileAcceptInvitationInput!) {
    profileAcceptInvitation(input: $input) {
      profileUserRole {
        id
        status
      }
      profile {
        id
        name
      }
      errors {
        field
        messages
      }
    }
  }
`

/** Accept an invitation as the signed-in user. */
export const useAcceptInvitationMutation = (): [
  (config: UseMutationConfig<AcceptInvitationMutation>) => Disposable,
  boolean,
] => {
  const { sendMutationErrorToast, sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<AcceptInvitationMutation>(
    AcceptInvitationMutationQuery,
  )

  const commit = (config: UseMutationConfig<AcceptInvitationMutation>) =>
    commitMutation({
      ...config,
      onCompleted: (response, errors) => {
        sendMutationErrorToast(response?.profileAcceptInvitation?.errors, errors, {
          defaultMessage: 'Invitation could not be accepted',
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
