import { useNotification } from '@baseapp-frontend/utils'

import { useIntl } from 'react-intl'
import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { RemoveMemberMutation } from '../../../../../__generated__/RemoveMemberMutation.graphql'

export const ProfileRemoveMemberMutationQuery = graphql`
  mutation RemoveMemberMutation($input: ProfileUserRoleDeleteInput!) {
    profileUserRoleDelete(input: $input) {
      deletedId @deleteRecord
    }
  }
`

export const useRemoveMemberMutation = (): [
  (config: UseMutationConfig<RemoveMemberMutation>) => Disposable,
  boolean,
] => {
  const { sendMutationErrorToast, sendToast } = useNotification()
  const intl = useIntl()
  const [commitMutation, isMutationInFlight] = useMutation<RemoveMemberMutation>(
    ProfileRemoveMemberMutationQuery,
  )

  const commit = (config: UseMutationConfig<RemoveMemberMutation>) =>
    commitMutation({
      ...config,
      onCompleted: (response, errors) => {
        const errorMessage = sendMutationErrorToast(undefined, errors)
        if (!errorMessage) {
          sendToast(
            intl.formatMessage({
              id: 'profiles.members.removeMember.success',
              defaultMessage: 'Member removed successfully',
            }),
            { type: 'success' },
          )
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
