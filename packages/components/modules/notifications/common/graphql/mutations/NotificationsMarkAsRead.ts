import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { NotificationsMarkAsReadMutation } from '../../../../../__generated__/NotificationsMarkAsReadMutation.graphql'

const NotificationsMarkAsReadMutationQuery = graphql`
  mutation NotificationsMarkAsReadMutation($input: NotificationsMarkAsReadInput!) {
    notificationsMarkAsRead(input: $input) {
      recipient {
        id
        notificationsUnreadCount
      }
      notifications {
        id
        unread
      }
    }
  }
`

export const useNotificationsMarkAsRead = (): [
  (config: UseMutationConfig<NotificationsMarkAsReadMutation>) => Disposable,
  boolean,
] => {
  const { sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<NotificationsMarkAsReadMutation>(
    NotificationsMarkAsReadMutationQuery,
  )

  const commit = (config: UseMutationConfig<NotificationsMarkAsReadMutation>) =>
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
