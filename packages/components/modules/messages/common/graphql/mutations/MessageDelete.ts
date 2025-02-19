import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { MessageDeleteMutation } from '../../../../../__generated__/MessageDeleteMutation.graphql'

export const MessageDeleteMutationQuery = graphql`
  mutation MessageDeleteMutation($input: ChatRoomDeleteMessageInput!) {
    chatRoomDeleteMessage(input: $input) {
      deletedMessage {
        node {
          id
          ...MessageItemFragment
        }
      }
      errors {
        field
        messages
      }
    }
  }
`

export const useMessageDeleteMutation = (): [
  (config: UseMutationConfig<MessageDeleteMutation>) => Disposable,
  boolean,
] => {
  const { sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<MessageDeleteMutation>(
    MessageDeleteMutationQuery,
  )

  const commit = (config: UseMutationConfig<MessageDeleteMutation>) =>
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
