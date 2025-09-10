import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { ProfileUserRoleUpdateMutation } from '../../../../../__generated__/ProfileUserRoleUpdateMutation.graphql'

export const ProfileUserRoleUpdateMutationQuery = graphql`
  mutation ProfileUserRoleUpdateMutation($input: ProfileUserRoleUpdateInput!) {
    profileUserRoleUpdate(input: $input) {
      profileUserRole {
        id
        role
      }
      errors {
        field
        messages
      }
    }
  }
`

export const useProfileUserRoleUpdateMutation = (): [
  (config: UseMutationConfig<ProfileUserRoleUpdateMutation>) => Disposable,
  boolean,
] => {
  const { sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<ProfileUserRoleUpdateMutation>(
    ProfileUserRoleUpdateMutationQuery,
  )

  const commit = (config: UseMutationConfig<ProfileUserRoleUpdateMutation>) =>
    commitMutation({
      ...config,
      onCompleted: (response, errors) => {
        errors?.forEach((error) => {
          sendToast(error.message, { type: 'error' })
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
