import { useNotification } from '@baseapp-frontend/utils'

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
  const [commitMutation, isMutationInFlight] = useMutation<RemoveMemberMutation>(
    ProfileRemoveMemberMutationQuery,
  )

  const commit = (config: UseMutationConfig<RemoveMemberMutation>) =>
    commitMutation({
      ...config,
      onCompleted: (response, errors) => {
        const errorMessage = sendMutationErrorToast(undefined, errors)
        if (!errorMessage) {
          sendToast('Member removed successfully', { type: 'success' })
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
