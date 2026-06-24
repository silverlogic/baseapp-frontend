import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { ResendInvitationMutation } from '../../../../../__generated__/ResendInvitationMutation.graphql'

export const ResendInvitationMutationQuery = graphql`
  mutation ResendInvitationMutation($input: ProfileResendInvitationInput!) {
    profileResendInvitation(input: $input) {
      profileUserRole {
        id
        status
        invitationExpiresAt
      }
      emailSent
      errors {
        field
        messages
      }
    }
  }
`

export const useResendInvitationMutation = (): [
  (config: UseMutationConfig<ResendInvitationMutation>) => Disposable,
  boolean,
] => {
  const { sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<ResendInvitationMutation>(
    ResendInvitationMutationQuery,
  )

  const commit = (config: UseMutationConfig<ResendInvitationMutation>) =>
    commitMutation({
      ...config,
      onCompleted: (response, errors) => {
        if (errors?.length) {
          errors.forEach((error) => sendToast(error.message, { type: 'error' }))
        } else if (response?.profileResendInvitation?.emailSent === false) {
          sendToast('Invitation updated, but the email could not be sent', { type: 'warning' })
        } else {
          sendToast('Invitation resent successfully', { type: 'success' })
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
