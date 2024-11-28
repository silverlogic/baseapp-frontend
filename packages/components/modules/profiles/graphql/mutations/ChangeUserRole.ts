import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { ChangeUserRoleMutation } from '../../../../__generated__/ChangeUserRoleMutation.graphql'

export const ChangeUserRoleMutationQuery = graphql`
  mutation ChangeUserRoleMutation($input: RoleUpdateInput!) {
    roleUpdate(input: $input) {
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

export const useChangeUserRoleMutation = (): [
  (config: UseMutationConfig<ChangeUserRoleMutation>) => Disposable,
  boolean,
] => {
  const { sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<ChangeUserRoleMutation>(
    ChangeUserRoleMutationQuery,
  )

  const commit = (config: UseMutationConfig<ChangeUserRoleMutation>) =>
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
