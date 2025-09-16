import { useNotification } from '@baseapp-frontend/utils'

import { UseMutationConfig, graphql, useMutation } from 'react-relay'

import { ProfileUserRoleCreateMutation } from '../../../../../__generated__/ProfileUserRoleCreateMutation.graphql'

export const ProfileUserRoleCreateMutationQuery = graphql`
  mutation ProfileUserRoleCreateMutation($input: ProfileUserRoleCreateInput!) {
    profileUserRoleCreate(input: $input) {
      profileUserRoles {
        id
        role
      }
    }
  }
`

export const useProfileUserRoleCreateMutation = (): [
  (config: UseMutationConfig<ProfileUserRoleCreateMutation>) => void,
  boolean,
] => {
  const [commitMutation, isMutationInFlight] = useMutation<ProfileUserRoleCreateMutation>(
    ProfileUserRoleCreateMutationQuery,
  )

  const { sendToast } = useNotification()
  const commit = (config: UseMutationConfig<ProfileUserRoleCreateMutation>) => {
    commitMutation({
      ...config,
      onCompleted: (response, errors) => {
        errors?.forEach((error) => {
          sendToast(error.message, { type: 'error' })
        })
        config?.onCompleted?.(response, errors)
      },
      onError: (error) => {
        if (error.message.includes('duplicate key value violates unique constraint')) {
          sendToast('You have already invited this user to this profile.', { type: 'error' })
        } else {
          sendToast(error.message, { type: 'error' })
        }
        config?.onError?.(error)
      },
    })
  }

  return [commit, isMutationInFlight]
}
