import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { ArchiveChatRoomMutation } from '../../../../__generated__/ArchiveChatRoomMutation.graphql'

export const ArchiveChatRoomMutationQuery = graphql`
  mutation ArchiveChatRoomMutation($input: ChatRoomArchiveInput!) {
    chatRoomArchive(input: $input) {
      room {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`

export const useArchiveChatRoomMutation = (): [
  (config: UseMutationConfig<ArchiveChatRoomMutation>) => Disposable,
  boolean,
] => {
  const { sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<ArchiveChatRoomMutation>(
    ArchiveChatRoomMutationQuery,
  )

  const commit = (config: UseMutationConfig<ArchiveChatRoomMutation>) =>
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
