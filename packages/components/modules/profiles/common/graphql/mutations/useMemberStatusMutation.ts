import { type MutationPayloadErrors, useNotification } from '@baseapp-frontend/utils'

import { MessageDescriptor, useIntl } from 'react-intl'
import { Disposable, GraphQLTaggedNode, UseMutationConfig, useMutation } from 'react-relay'
import { MutationParameters } from 'relay-runtime'

/**
 * Commits a member status mutation (deactivate, reactivate) with its toasts: the payload or
 * transport error, else `messages.success`.
 */
export const useMemberStatusMutation = <TMutation extends MutationParameters>(
  mutation: GraphQLTaggedNode,
  getPayloadErrors: (response: TMutation['response'] | null | undefined) => MutationPayloadErrors,
  messages: { failed: MessageDescriptor; success: MessageDescriptor },
): [(config: UseMutationConfig<TMutation>) => Disposable, boolean] => {
  const { sendMutationErrorToast, sendToast } = useNotification()
  const intl = useIntl()
  const [commitMutation, isMutationInFlight] = useMutation<TMutation>(mutation)

  const commit = (config: UseMutationConfig<TMutation>) =>
    commitMutation({
      ...config,
      onCompleted: (response, errors) => {
        const errorMessage = sendMutationErrorToast(getPayloadErrors(response), errors, {
          defaultMessage: intl.formatMessage(messages.failed),
        })
        if (!errorMessage) {
          sendToast(intl.formatMessage(messages.success), { type: 'success' })
        }
        config?.onCompleted?.(response, errors)
      },
      onError: (error) => {
        sendToast(error.message, { type: 'error' })
        config?.onError?.(error)
      },
    })

  return [commit, isMutationInFlight]
}
