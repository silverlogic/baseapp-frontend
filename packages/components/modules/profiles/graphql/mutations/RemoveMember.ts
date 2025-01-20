import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { RemoveMemberMutation } from '../../../../__generated__/RemoveMemberMutation.graphql'

export const RemoveMemberMutationQuery = graphql`
  mutation RemoveMemberMutation($input: RemoveProfileMemberInput!) {
    removeProfileMember(input: $input) {
      deletedId @deleteRecord
    }
  }
`

export const useRemoveMemberMutation = (
  setHideMember: (hideMember: boolean) => void,
): [(config: UseMutationConfig<RemoveMemberMutation>) => Disposable, boolean] => {
  const [commitMutation, isMutationInFlight] =
    useMutation<RemoveMemberMutation>(RemoveMemberMutationQuery)
  const { sendToast } = useNotification()

  const commit = (config: UseMutationConfig<RemoveMemberMutation>) =>
    commitMutation({
      ...config,
      onCompleted: (response, errors) => {
        sendToast('Member removed successfully', { type: 'success' })
        setHideMember(true)
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
