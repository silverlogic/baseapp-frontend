import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { AddParticipantToChatRoomsMutation } from '../../../../../__generated__/AddParticipantToChatRoomsMutation.graphql'

export const AddParticipantToChatRoomsMutationQuery = graphql`
  mutation AddParticipantToChatRoomsMutation(
    $input: ChatRoomsAddParticipantInput!
    $contactProfileId: ID!
  ) {
    chatRoomsAddParticipant(input: $input) {
      rooms {
        id
        participantsCount
        isParticipant(profileId: $contactProfileId)
      }
      addedParticipants {
        id
        profile {
          id
        }
      }
      errors {
        field
        messages
      }
    }
  }
`

export const useAddParticipantToChatRoomsMutation = (): [
  (config: UseMutationConfig<AddParticipantToChatRoomsMutation>) => Disposable,
  boolean,
] => {
  const { sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<AddParticipantToChatRoomsMutation>(
    AddParticipantToChatRoomsMutationQuery,
  )

  const commit = (config: UseMutationConfig<AddParticipantToChatRoomsMutation>) =>
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
