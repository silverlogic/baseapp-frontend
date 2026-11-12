import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { AcceptInvitationWithSignupMutation } from '../../../../../__generated__/AcceptInvitationWithSignupMutation.graphql'

export const AcceptInvitationWithSignupMutationQuery = graphql`
  mutation AcceptInvitationWithSignupMutation($input: ProfileAcceptInvitationWithSignupInput!) {
    profileAcceptInvitationWithSignup(input: $input) {
      success
      email
      errors {
        field
        messages
      }
    }
  }
`

/**
 * Accept an invitation without an account: the backend creates (or activates) the account for
 * the invited email with the given password, and the invitee signs in with `email` next. The
 * mutation needs no sign-in and only exists when the backend enables invitation signup.
 *
 * A refusal (expired or cancelled invitation, an account that has to sign in instead) reaches
 * `onCompleted` as `errors`, each with a stable `extensions.code` to branch on.
 */
export const useAcceptInvitationWithSignupMutation = (): [
  (config: UseMutationConfig<AcceptInvitationWithSignupMutation>) => Disposable,
  boolean,
] => {
  const { sendMutationErrorToast, sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<AcceptInvitationWithSignupMutation>(
    AcceptInvitationWithSignupMutationQuery,
  )

  const commit = (config: UseMutationConfig<AcceptInvitationWithSignupMutation>) =>
    commitMutation({
      ...config,
      onCompleted: (response, errors) => {
        sendMutationErrorToast(response?.profileAcceptInvitationWithSignup?.errors, errors, {
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
