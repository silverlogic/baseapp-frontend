import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { MessageUpdateMutation } from '../../../../__generated__/MessageUpdateMutation.graphql'

export const MessageUpdateMutationQuery = graphql`
  mutation MessageUpdateMutation($input: ChatRoomEditMessageInput!) {
    chatRoomEditMessage(input: $input) {
      message {
        node {
          id
          content
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

export const useMessageUpdateMutation = (): [
  (config: UseMutationConfig<MessageUpdateMutation>) => Disposable,
  boolean,
] => {
  const { sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<MessageUpdateMutation>(
    MessageUpdateMutationQuery,
  )

  const commit = (config: UseMutationConfig<MessageUpdateMutation>) =>
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
