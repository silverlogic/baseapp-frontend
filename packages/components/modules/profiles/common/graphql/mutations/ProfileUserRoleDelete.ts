import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { ProfileUserRoleDeleteMutation } from '../../../../../__generated__/ProfileUserRoleDeleteMutation.graphql'

export const ProfileUserRoleDeleteMutationQuery = graphql`
  mutation ProfileUserRoleDeleteMutation($input: ProfileUserRoleDeleteInput!) {
    profileUserRoleDelete(input: $input) {
      deletedId @deleteRecord
    }
  }
`

export const useRemoveMemberMutation = (): [
  (config: UseMutationConfig<ProfileUserRoleDeleteMutation>) => Disposable,
  boolean,
] => {
  const { sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<ProfileUserRoleDeleteMutation>(
    ProfileUserRoleDeleteMutationQuery,
  )

  const commit = (config: UseMutationConfig<ProfileUserRoleDeleteMutation>) =>
    commitMutation({
      ...config,
      onCompleted: (response, errors) => {
        config?.onCompleted?.(response, errors)
      },
      onError: (error) => {
        sendToast(error.message, { type: 'error' })
        config?.onError?.(error)
      },
    })

  return [commit, isMutationInFlight]
}
