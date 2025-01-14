import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { ReadMessagesMutation } from '../../../../__generated__/ReadMessagesMutation.graphql'

export const ReadMessagesMutationQuery = graphql`
  mutation ReadMessagesMutation($input: ChatRoomReadMessagesInput!) {
    chatRoomReadMessages(input: $input) {
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

export const useReadMessageMutation = (): [
  (config: UseMutationConfig<ReadMessagesMutation>) => Disposable,
  boolean,
] => {
  const { sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] =
    useMutation<ReadMessagesMutation>(ReadMessagesMutationQuery)

  const commit = (config: UseMutationConfig<ReadMessagesMutation>) =>
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
