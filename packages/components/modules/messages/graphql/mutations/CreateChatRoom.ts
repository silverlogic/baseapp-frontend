import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { CreateChatRoomMutation } from '../../../../__generated__/CreateChatRoomMutation.graphql'
import { useChatRoom } from '../../context'

export const CreateChatRoomMutationQuery = graphql`
  mutation CreateChatRoomMutation($input: ChatRoomCreateInput!) {
    chatRoomCreate(input: $input) {
      room {
        node {
          id
          participants {
            edges {
              node {
                id
              }
            }
          }
        }
      }
      errors {
        field
        messages
      }
    }
  }
`

export const useCreateChatRoomMutation = (): [
  (config: UseMutationConfig<CreateChatRoomMutation>) => Disposable,
  boolean,
] => {
  const { sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<CreateChatRoomMutation>(
    CreateChatRoomMutationQuery,
  )
  const { setChatRoom } = useChatRoom()

  const commit = (config: UseMutationConfig<CreateChatRoomMutation>) =>
    commitMutation({
      ...config,
      onCompleted: (response, errors) => {
        errors?.forEach((error) => {
          sendToast(error.message, { type: 'error' })
        })
        setChatRoom({
          id: response?.chatRoomCreate?.room?.node?.id,
          participants: response?.chatRoomCreate?.room?.node?.participants?.edges?.map(
            (edge) => edge?.node && edge.node.id,
          ),
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
