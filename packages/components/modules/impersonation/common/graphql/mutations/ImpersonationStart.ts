import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { ImpersonationStartMutation } from '../../../../../__generated__/ImpersonationStartMutation.graphql'

export const ImpersonationStartMutationQuery = graphql`
  mutation ImpersonationStartMutation($input: ImpersonationStartInput!) {
    impersonationStart(input: $input) {
      access
      refresh
      session {
        id
        readOnly
        startedAt
        expiresAt
        target {
          id
          fullName
        }
      }
      errors {
        field
        messages
      }
    }
  }
`

export const useImpersonationStartMutation = (): [
  (config: UseMutationConfig<ImpersonationStartMutation>) => Disposable,
  boolean,
] => {
  const { sendMutationErrorToast, sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<ImpersonationStartMutation>(
    ImpersonationStartMutationQuery,
  )

  const commit = (config: UseMutationConfig<ImpersonationStartMutation>) =>
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
