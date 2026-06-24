import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { ProfileUserRoleCreateMutation } from '../../../../../__generated__/ProfileUserRoleCreateMutation.graphql'

export const ProfileUserRoleCreateMutationQuery = graphql`
  mutation ProfileUserRoleCreateMutation($input: ProfileUserRoleCreateInput!) {
    profileUserRoleCreate(input: $input) {
      profileUserRoles {
        id
        status
        role
      }
      errors {
        field
        messages
      }
    }
  }
`

export const useProfileUserRoleCreateMutation = (): [
  (config: UseMutationConfig<ProfileUserRoleCreateMutation>) => Disposable,
  boolean,
] => {
  const { sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<ProfileUserRoleCreateMutation>(
    ProfileUserRoleCreateMutationQuery,
  )

  const commit = (config: UseMutationConfig<ProfileUserRoleCreateMutation>) =>
    commitMutation({
      ...config,
      onError: (error) => {
        sendToast(error.message, { type: 'error' })
        config?.onError?.(error)
      },
    })

  return [commit, isMutationInFlight]
}
