import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { RemoveMemberMutation } from '../../../../__generated__/RemoveMemberMutation.graphql'

export const ProfileRemoveMemberMutationQuery = graphql`
  mutation RemoveMemberMutation($id: ID!) {
    profileRemoveMember(input: { id: $id }) {
      deletedId @deleteRecord
    }
  }
`

export const useRemoveMemberMutation = (
  setHideMember: (hide: boolean) => void,
): [(config: UseMutationConfig<RemoveMemberMutation>) => Disposable, boolean] => {
  const { sendToast } = useNotification()
  const [commitDelete, isMutationInFlight] = useMutation<RemoveMemberMutation>(
    ProfileRemoveMemberMutationQuery,
  )

  const commit = (config: UseMutationConfig<RemoveMemberMutation>) =>
    commitDelete({
      ...config,
      onCompleted: (response, errors) => {
        sendToast('Member removed successfully', { type: 'success' })
        setHideMember(true)
        config?.onCompleted?.(response, errors)
      },
      onError: (error) => {
        sendToast(error.message, { type: 'error' })
        config?.onError?.(error)
      },
    })

  return [commit, isMutationInFlight]
}
