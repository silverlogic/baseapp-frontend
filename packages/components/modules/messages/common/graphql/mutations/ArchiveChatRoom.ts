import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { useNotification } from '@baseapp-frontend/utils'

import { ConnectionHandler, Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { ArchiveChatRoomMutation } from '../../../../../__generated__/ArchiveChatRoomMutation.graphql'
import { getChatRoomConnections } from '../../utils'

export const ArchiveChatRoomMutationQuery = graphql`
  mutation ArchiveChatRoomMutation($input: ChatRoomArchiveInput!) {
    chatRoomArchive(input: $input) {
      room {
        id
        isArchived
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
  const { currentProfile } = useCurrentProfile()

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
      updater: (store, data) => {
        if (!data?.chatRoomArchive?.errors && currentProfile?.id) {
          getChatRoomConnections(
            store,
            currentProfile.id,
            ({ archived }) => archived === !data?.chatRoomArchive?.room?.isArchived,
          ).forEach((connectionRecord) => {
            if (data?.chatRoomArchive?.room?.id)
              ConnectionHandler.deleteNode(connectionRecord, data?.chatRoomArchive?.room?.id)
          })
        }
        config?.updater?.(store, data)
      },
    })

  return [commit, isMutationInFlight]
}
