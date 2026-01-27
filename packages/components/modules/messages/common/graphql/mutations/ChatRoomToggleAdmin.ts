import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { ChatRoomToggleAdminMutation } from '../../../../../__generated__/ChatRoomToggleAdminMutation.graphql'

export const ChatRoomToggleAdminMutationQuery = graphql`
  mutation ChatRoomToggleAdminMutation($input: ChatRoomToggleAdminInput!) {
    chatRoomToggleAdmin(input: $input) {
      participant {
        node {
          id
          role
        }
      }
      errors {
        field
        messages
      }
    }
  }
`

export const useChatRoomToggleAdminMutation = (): [
  (config: UseMutationConfig<ChatRoomToggleAdminMutation>) => Disposable,
  boolean,
] => {
  const { sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<ChatRoomToggleAdminMutation>(
    ChatRoomToggleAdminMutationQuery,
  )

  const commit = (config: UseMutationConfig<ChatRoomToggleAdminMutation>) =>
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
