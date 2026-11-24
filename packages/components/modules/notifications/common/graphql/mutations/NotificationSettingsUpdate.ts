import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { NotificationSettingsUpdateMutation } from '../../../../../__generated__/NotificationSettingsUpdateMutation.graphql'

export const NotificationSettingsUpdateMutationQuery = graphql`
  mutation NotificationSettingsUpdateMutation($input: NotificationSettingsUpdateInput!) {
    notificationSettingsUpdate(input: $input) {
      groups {
        key
        channels {
          channel
          isActive
        }
      }
      errors {
        field
        messages
      }
    }
  }
`

export const useNotificationSettingsUpdateMutation = (): [
  (config: UseMutationConfig<NotificationSettingsUpdateMutation>) => Disposable,
  boolean,
] => {
  const { sendMutationErrorToast, sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<NotificationSettingsUpdateMutation>(
    NotificationSettingsUpdateMutationQuery,
  )

  const commit = (config: UseMutationConfig<NotificationSettingsUpdateMutation>) =>
    commitMutation({
      ...config,
      onCompleted: (response, errors) => {
        sendMutationErrorToast(response.notificationSettingsUpdate?.errors, errors)
        config?.onCompleted?.(response, errors)
      },
      onError: (error) => {
        sendToast(error.message, { type: 'error' })
        config?.onError?.(error)
      },
    })

  return [commit, isMutationInFlight]
}
