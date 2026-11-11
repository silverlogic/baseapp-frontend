import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { CardHoldCancelMutation } from '../../../../../__generated__/CardHoldCancelMutation.graphql'

export const CardHoldCancelMutationQuery = graphql`
  mutation CardHoldCancelMutation($input: CardHoldCancelInput!) {
    cardHoldCancel(input: $input) {
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

export const useCardHoldCancelMutation = (): [
  (config: UseMutationConfig<CardHoldCancelMutation>) => Disposable,
  boolean,
] => {
  const { sendMutationErrorToast, sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<CardHoldCancelMutation>(
    CardHoldCancelMutationQuery,
  )

  const commit = (config: UseMutationConfig<CardHoldCancelMutation>) =>
    commitMutation({
      ...config,
      onCompleted: (response, errors) => {
        sendMutationErrorToast(response?.cardHoldCancel?.errors, errors)
        config?.onCompleted?.(response, errors)
      },
      onError: (error) => {
        sendToast(error.message, { type: 'error' })
        config?.onError?.(error)
      },
    })

  return [commit, isMutationInFlight]
}
