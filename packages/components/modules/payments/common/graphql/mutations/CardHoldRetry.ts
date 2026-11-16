import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { CardHoldRetryMutation } from '../../../../../__generated__/CardHoldRetryMutation.graphql'

export const CardHoldRetryMutationQuery = graphql`
  mutation CardHoldRetryMutation($input: CardHoldRetryInput!) {
    cardHoldRetry(input: $input) {
      cardHold {
        id
        ...CardHoldStatusLabel_cardHold
        ...CardHoldStaffActions_cardHold
      }
      errors {
        field
        messages
      }
    }
  }
`

export const useCardHoldRetryMutation = (): [
  (config: UseMutationConfig<CardHoldRetryMutation>) => Disposable,
  boolean,
] => {
  const { sendMutationErrorToast, sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<CardHoldRetryMutation>(
    CardHoldRetryMutationQuery,
  )

  const commit = (config: UseMutationConfig<CardHoldRetryMutation>) =>
    commitMutation({
      ...config,
      onCompleted: (response, errors) => {
        sendMutationErrorToast(response?.cardHoldRetry?.errors, errors)
        config?.onCompleted?.(response, errors)
      },
      onError: (error) => {
        sendToast(error.message, { type: 'error' })
        config?.onError?.(error)
      },
    })

  return [commit, isMutationInFlight]
}
