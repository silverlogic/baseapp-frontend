import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { SendMessageMutation } from '../../../../../__generated__/SendMessageMutation.graphql'

export const SendMessageMutationQuery = graphql`
  mutation SendMessageMutation($input: ChatRoomSendMessageInput!, $connections: [ID!]!) {
    chatRoomSendMessage(input: $input) {
      message @prependEdge(connections: $connections) {
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

export const useSendMessageMutation = (): [
  (config: UseMutationConfig<SendMessageMutation>) => Disposable,
  boolean,
] => {
  const { sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] =
    useMutation<SendMessageMutation>(SendMessageMutationQuery)

  const commit = (config: UseMutationConfig<SendMessageMutation>) =>
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
