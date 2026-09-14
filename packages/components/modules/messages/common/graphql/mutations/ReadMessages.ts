import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { ReadMessagesMutation } from '../../../../../__generated__/ReadMessagesMutation.graphql'

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
  const { sendMutationErrorToast, sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] =
    useMutation<ReadMessagesMutation>(ReadMessagesMutationQuery)

  const commit = (config: UseMutationConfig<ReadMessagesMutation>) =>
    commitMutation({
      ...config,
      onCompleted: (response, errors) => {
        // This mutation fires passively (MessagesList marks rooms read from a useEffect on
        // room open / unread-count changes), so payload validation errors are deliberately
        // not toasted — they would show up as unattributable errors during navigation.
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
