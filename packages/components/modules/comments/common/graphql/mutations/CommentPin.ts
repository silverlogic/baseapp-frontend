import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { CommentPinMutation } from '../../../../../__generated__/CommentPinMutation.graphql'

export const CommentPinMutationQuery = graphql`
  mutation CommentPinMutation($id: ID!) {
    commentPin(input: { id: $id }) {
      comment {
        id
        isPinned
      }
    }
  }
`

export const useCommentPinMutation = (): [
  (config: UseMutationConfig<CommentPinMutation>) => Disposable,
  boolean,
] => {
  const { sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] =
    useMutation<CommentPinMutation>(CommentPinMutationQuery)

  const commit = (config: UseMutationConfig<CommentPinMutation>) =>
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
