import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { useNotification } from '@baseapp-frontend/utils'

import { ConnectionHandler, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { CreateChatRoomMutation } from '../../../../../__generated__/CreateChatRoomMutation.graphql'
import { useGroupChatCreate } from '../../context/GroupChatProvider'
import { CreateChatRoomMutationQuery } from './CreateChatRoom'

export const CreateGroupChatMutationQuery = graphql`
  mutation CreateGroupChatMutation($input: ChatRoomCreateInput!, $connections: [ID!]!) {
    chatRoomCreate(input: $input) {
      room @prependEdge(connections: $connections) {
        node {
          id
          ...LastMessageFragment
          ...TitleFragment
          ...UnreadMessagesCountFragment
        }
      }
      errors {
        field
        messages
      }
    }
  }
`

export const useCreateGroupChatMutation = (): [
  (config: UseMutationConfig<CreateChatRoomMutation>) => void,
  boolean,
] => {
  const { sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<CreateChatRoomMutation>(
    CreateChatRoomMutationQuery,
  )
  const { setGroupChat, participants, title } = useGroupChatCreate()

  const { currentProfile } = useCurrentProfile()

  const commit = (config: UseMutationConfig<CreateChatRoomMutation>) => {
    if (currentProfile?.id && participants.length > 0) {
      commitMutation({
        variables: {
          input: {
            profileId: currentProfile.id,
            participants: participants.map((p) => p.id),
            isGroup: true,
            title,
          },
          connections: [
            ConnectionHandler.getConnectionID(currentProfile.id, 'roomsList_chatRooms', {
              unreadMessages: false,
              archived: false,
              q: '',
              isGroup: true,
            }),
          ],
        },
        onCompleted: (response, errors) => {
          errors?.forEach((error) => {
            sendToast(error.message, { type: 'error' })
          })
          setGroupChat({
            id: response?.chatRoomCreate?.room?.node?.id,
          })

          config?.onCompleted?.(response, errors)
        },
        onError: (error) => {
          sendToast(error.message, { type: 'error' })
        },
      })
    }
  }

  return [commit, isMutationInFlight]
}

export default useCreateGroupChatMutation
