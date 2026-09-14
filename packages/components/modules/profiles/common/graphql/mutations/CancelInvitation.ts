import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { CancelInvitationMutation } from '../../../../../__generated__/CancelInvitationMutation.graphql'

export const CancelInvitationMutationQuery = graphql`
  mutation CancelInvitationMutation($input: ProfileCancelInvitationInput!) {
    profileCancelInvitation(input: $input) {
      success
      errors {
        field
        messages
      }
    }
  }
`

export const useCancelInvitationMutation = (): [
  (config: UseMutationConfig<CancelInvitationMutation>) => Disposable,
  boolean,
] => {
  const { sendMutationErrorToast, sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<CancelInvitationMutation>(
    CancelInvitationMutationQuery,
  )

  const commit = (config: UseMutationConfig<CancelInvitationMutation>) =>
    commitMutation({
      ...config,
      onCompleted: (response, errors) => {
        const errorMessage = sendMutationErrorToast(
          response?.profileCancelInvitation?.errors,
          errors,
          {
            defaultMessage: 'Invitation could not be removed',
          },
        )

        if (!errorMessage) {
          if (response?.profileCancelInvitation?.success === false) {
            sendToast('Invitation could not be removed', { type: 'error' })
          } else {
            sendToast('Invitation removed', { type: 'success' })
          }
        }
        config?.onCompleted?.(response, errors)
      },
      onError: (error) => {
        sendToast(error.message, { type: 'error' })
        config?.onError?.(error)
      },
    })

  return [commit, isMutationInFlight]
}
