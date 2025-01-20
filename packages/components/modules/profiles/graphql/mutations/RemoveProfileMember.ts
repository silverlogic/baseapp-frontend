import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { RemoveProfileMemberMutation } from '../../../../__generated__/RemoveProfileMemberMutation.graphql'

export const RemoveProfileMemberMutationQuery = graphql`
  mutation RemoveProfileMemberMutation($input: RemoveFromProfileInput!) {
    removeFromProfile(input: $input) {
      profileUserRole {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`

export const useRemoveProfileMemberMutation = (): [
  (config: UseMutationConfig<RemoveProfileMemberMutation>) => Disposable,
  boolean,
] => {
  const { sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<RemoveProfileMemberMutation>(
    RemoveProfileMemberMutationQuery,
  )

  const commit = (config: UseMutationConfig<RemoveProfileMemberMutation>) =>
    commitMutation({
      ...config,
      onCompleted: (response, errors) => {
        sendToast('Member removed successfully', { type: 'success' })
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
