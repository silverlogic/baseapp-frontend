import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { CommentUpdateMutation } from '../../../../../__generated__/CommentUpdateMutation.graphql'

export const CommentUpdateMutationQuery = graphql`
  mutation CommentUpdateMutation($input: CommentUpdateInput!) {
    commentUpdate(input: $input) {
      comment {
        id
        body
        ...CommentItem_comment
      }
      errors {
        field
        messages
      }
    }
  }
`

export const useCommentUpdateMutation = (): [
  (config: UseMutationConfig<CommentUpdateMutation>) => Disposable,
  boolean,
] => {
  const { sendMutationErrorToast, sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<CommentUpdateMutation>(
    CommentUpdateMutationQuery,
  )

  const commit = (config: UseMutationConfig<CommentUpdateMutation>) =>
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
