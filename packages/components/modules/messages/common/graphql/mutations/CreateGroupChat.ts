import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { ACCESS_KEY_NAME, getToken, useNotification } from '@baseapp-frontend/utils'

import * as FileSystem from 'expo-file-system'
import { ConnectionHandler, UseMutationConfig, graphql, useMutation } from 'react-relay'
import { PayloadError } from 'relay-runtime'

import {
  CreateGroupChatMutation,
  CreateGroupChatMutation$data,
} from '../../../../../__generated__/CreateGroupChatMutation.graphql'
import { useGroupChatCreate } from '../../context/GroupChatProvider'

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
  (config: UseMutationConfig<CreateGroupChatMutation>) => void,
  boolean,
] => {
  const { sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<CreateGroupChatMutation>(
    CreateGroupChatMutationQuery,
  )
  const { setGroupChat, participants, title, image } = useGroupChatCreate()

  const { currentProfile } = useCurrentProfile()
  const uploadFile = async (id: string, fileUri: string, fieldName: 'image' | 'bannerImage') => {
    try {
      const authToken = getToken(ACCESS_KEY_NAME)
      const fileInfo = await FileSystem.getInfoAsync(fileUri)
      if (!fileInfo.exists) {
        sendToast('File does not exist', { type: 'error' })
      }

      // TODO: see if we can abstract file uploads into a shared function
      const response = await FileSystem.uploadAsync(
        process.env.EXPO_PUBLIC_RELAY_ENDPOINT as string,
        fileUri,
        {
          httpMethod: 'POST',
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName,
          parameters: {
            // TODO: see if we can reuse the query from the mutation
            query: `mutation ChatRoomUpdateMutation($input: ChatRoomUpdateInput!) {
                 chatRoomUpdate(input: $input) {
                   room {
                    node {
                        id
                    }
                   }
                   errors {
                     field
                     messages
                   }
                 }
               }`,
            variables: JSON.stringify({
              input: {
                profileId: currentProfile?.id,
                roomId: id,
                [fieldName]: fileUri,
              },
            }),
          },
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authToken}`,
          },
        },
      )
      if (response.status !== 200) {
        console.error('File upload failed with status:', response.body)
        sendToast('Failed to upload file', { type: 'error' })
      }
    } catch (error) {
      console.error('File upload error:', error)
      sendToast('Failed to upload file', { type: 'error' })
    }
  }

  const commit = (config: UseMutationConfig<CreateGroupChatMutation>) => {
    if (currentProfile?.id && (participants ?? []).length > 0) {
      const onCompleted: (
        response: CreateGroupChatMutation$data,
        errors: PayloadError[] | null,
      ) => void = async (response, errors) => {
        errors?.forEach((error) => {
          sendToast(error.message, { type: 'error' })
        })

        const roomId = response?.chatRoomCreate?.room?.node?.id
        if (image && roomId) {
          await uploadFile(roomId, image, 'image')
          setGroupChat({
            id: roomId,
          })
          config?.onCompleted?.(response, errors)
        }
      }
      commitMutation({
        variables: {
          input: {
            isGroup: true,
            profileId: currentProfile.id,
            participants: (participants ?? []).map((p) => p.id),
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
          onCompleted(response, errors)
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
