import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { SendMessageMutation } from '../../../../../__generated__/SendMessageMutation.graphql'

export const SendMessageMutationQuery = graphql`
  mutation SendMessageMutation($input: ChatRoomSendMessageInput!, $connections: [ID!]!)
  @raw_response_type {
    chatRoomSendMessage(input: $input) {
      message @prependEdge(connections: $connections) {
        node {
          id
          messageType
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
  const { sendMutationErrorToast, sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] =
    useMutation<SendMessageMutation>(SendMessageMutationQuery)

  const commit = (config: UseMutationConfig<SendMessageMutation>) =>
    commitMutation({
      ...config,
      onCompleted: (response, errors) => {
        sendMutationErrorToast(undefined, errors)

        config?.onCompleted?.(response, errors)
      },
      onError: (error) => {
        sendToast(error.message, { type: 'error' })
        config?.onError?.(error)
      },
    })

  return [commit, isMutationInFlight]
}
