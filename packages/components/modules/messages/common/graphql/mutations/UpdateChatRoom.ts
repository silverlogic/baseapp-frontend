import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { UpdateChatRoomMutation } from '../../../../../__generated__/UpdateChatRoomMutation.graphql'

export const UpdateChatRoomMutationQuery = graphql`
  mutation UpdateChatRoomMutation($input: ChatRoomUpdateInput!, $connections: [ID!]!) {
    chatRoomUpdate(input: $input) {
      room {
        node {
          id
          participantsCount
          ...LastMessageFragment
          ...TitleFragment
          ...UnreadMessagesCountFragment
          ...MembersListFragment @arguments(count: 5)
        }
      }
      removedParticipants {
        id @deleteEdge(connections: $connections)
      }
      errors {
        field
        messages
      }
    }
  }
`

export const useUpdateChatRoomMutation = (): [
  (config: UseMutationConfig<UpdateChatRoomMutation>) => Disposable,
  boolean,
] => {
  const { sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<UpdateChatRoomMutation>(
    UpdateChatRoomMutationQuery,
  )

  const commit = (config: UseMutationConfig<UpdateChatRoomMutation>) =>
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
