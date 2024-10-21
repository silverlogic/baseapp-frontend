import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { CommentCreateMutation } from '../../../../__generated__/CommentCreateMutation.graphql'

export const CommentCreateMutationQuery = graphql`
  mutation CommentCreateMutation($input: CommentCreateInput!, $connections: [ID!]!) {
    commentCreate(input: $input) {
      comment @prependEdge(connections: $connections) {
        node {
          id
          target {
            id
            commentsCount {
              total
              main
              replies
            }
          }
          inReplyTo {
            id
            commentsCount {
              total
              main
              replies
            }
          }

          ...CommentItem_comment
        }
      }
      errors {
        field
        messages
      }
    }
  }
`

export const useCommentCreateMutation = (): [
  (config: UseMutationConfig<CommentCreateMutation>) => Disposable,
  boolean,
] => {
  const { sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<CommentCreateMutation>(
    CommentCreateMutationQuery,
  )

  const commit = (config: UseMutationConfig<CommentCreateMutation>) =>
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
