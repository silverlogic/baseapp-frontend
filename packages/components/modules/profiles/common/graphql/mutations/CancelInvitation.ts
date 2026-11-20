import { useNotification } from '@baseapp-frontend/utils'

import { useIntl } from 'react-intl'
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
  const intl = useIntl()
  const [commitMutation, isMutationInFlight] = useMutation<CancelInvitationMutation>(
    CancelInvitationMutationQuery,
  )

  const commit = (config: UseMutationConfig<CancelInvitationMutation>) =>
    commitMutation({
      ...config,
      onCompleted: (response, errors) => {
        const removeFailedMessage = intl.formatMessage({
          id: 'profiles.members.cancelInvitation.failed',
          defaultMessage: 'Invitation could not be removed',
        })
        const errorMessage = sendMutationErrorToast(
          response?.profileCancelInvitation?.errors,
          errors,
          {
            defaultMessage: removeFailedMessage,
          },
        )

        if (!errorMessage) {
          if (response?.profileCancelInvitation?.success === false) {
            sendToast(removeFailedMessage, { type: 'error' })
          } else {
            sendToast(
              intl.formatMessage({
                id: 'profiles.members.cancelInvitation.success',
                defaultMessage: 'Invitation removed',
              }),
              { type: 'success' },
            )
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
