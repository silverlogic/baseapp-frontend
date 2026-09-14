import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { NotificationsMarkAllAsReadMutation } from '../../../../../__generated__/NotificationsMarkAllAsReadMutation.graphql'

const NotificationsMarkAllAsReadMutationQuery = graphql`
  mutation NotificationsMarkAllAsReadMutation($input: NotificationsMarkAllAsReadInput!) {
    notificationsMarkAllAsRead(input: $input) {
      recipient {
        id
        notificationsUnreadCount
      }
    }
  }
`

export const useNotificationsMarkAllAsRead = (): [
  (config: UseMutationConfig<NotificationsMarkAllAsReadMutation>) => Disposable,
  boolean,
] => {
  const { sendMutationErrorToast, sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<NotificationsMarkAllAsReadMutation>(
    NotificationsMarkAllAsReadMutationQuery,
  )

  const commit = (config: UseMutationConfig<NotificationsMarkAllAsReadMutation>) =>
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
