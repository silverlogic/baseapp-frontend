import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { UnreadChatMutation } from '../../../../../__generated__/UnreadChatMutation.graphql'

export const UnreadChatMutationQuery = graphql`
  mutation UnreadChatMutation($input: ChatRoomUnreadInput!) {
    chatRoomUnread(input: $input) {
      room {
        id
        ...UnreadMessagesCountFragment
      }
      errors {
        field
        messages
      }
    }
  }
`

export const useUnreadChatMutation = (): [
  (config: UseMutationConfig<UnreadChatMutation>) => Disposable,
  boolean,
] => {
  const { sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] =
    useMutation<UnreadChatMutation>(UnreadChatMutationQuery)

  const commit = (config: UseMutationConfig<UnreadChatMutation>) =>
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
