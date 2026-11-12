import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { CardHoldKeepMutation } from '../../../../../__generated__/CardHoldKeepMutation.graphql'

export const CardHoldKeepMutationQuery = graphql`
  mutation CardHoldKeepMutation($input: CardHoldKeepInput!) {
    cardHoldKeep(input: $input) {
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

export const useCardHoldKeepMutation = (): [
  (config: UseMutationConfig<CardHoldKeepMutation>) => Disposable,
  boolean,
] => {
  const { sendMutationErrorToast, sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] =
    useMutation<CardHoldKeepMutation>(CardHoldKeepMutationQuery)

  const commit = (config: UseMutationConfig<CardHoldKeepMutation>) =>
    commitMutation({
      ...config,
      onCompleted: (response, errors) => {
        sendMutationErrorToast(response?.cardHoldKeep?.errors, errors)
        config?.onCompleted?.(response, errors)
      },
      onError: (error) => {
        sendToast(error.message, { type: 'error' })
        config?.onError?.(error)
      },
    })

  return [commit, isMutationInFlight]
}
