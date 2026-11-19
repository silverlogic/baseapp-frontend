import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { CardHoldMarkPaidMutation } from '../../../../../__generated__/CardHoldMarkPaidMutation.graphql'

export const CardHoldMarkPaidMutationQuery = graphql`
  mutation CardHoldMarkPaidMutation($input: CardHoldMarkPaidInput!) {
    cardHoldMarkPaid(input: $input) {
      cardHold {
        id
        ...CardHoldStaffNotice_cardHold
      }
      errors {
        field
        messages
      }
    }
  }
`

export const useCardHoldMarkPaidMutation = (): [
  (config: UseMutationConfig<CardHoldMarkPaidMutation>) => Disposable,
  boolean,
] => {
  const { sendMutationErrorToast, sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<CardHoldMarkPaidMutation>(
    CardHoldMarkPaidMutationQuery,
  )

  const commit = (config: UseMutationConfig<CardHoldMarkPaidMutation>) =>
    commitMutation({
      ...config,
      onCompleted: (response, errors) => {
        sendMutationErrorToast(response?.cardHoldMarkPaid?.errors, errors)
        config?.onCompleted?.(response, errors)
      },
      onError: (error) => {
        sendToast(error.message, { type: 'error' })
        config?.onError?.(error)
      },
    })

  return [commit, isMutationInFlight]
}
