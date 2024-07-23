import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { CommentDeleteMutation } from '../../../../__generated__/CommentDeleteMutation.graphql'

export const CommentDeleteMutationQuery = graphql`
  mutation CommentDeleteMutation($id: ID!) {
    commentDelete(input: { id: $id }) {
      deletedId @deleteRecord
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
    }
  }
`

const useCommentDeleteMutation = (): [
  (config: UseMutationConfig<CommentDeleteMutation>) => Disposable,
  boolean,
] => {
  const { sendToast } = useNotification()
  const [commitDelete, isMutationInFlight] = useMutation<CommentDeleteMutation>(
    CommentDeleteMutationQuery,
  )

  const commit = (config: UseMutationConfig<CommentDeleteMutation>) =>
    commitDelete({
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

export default useCommentDeleteMutation
