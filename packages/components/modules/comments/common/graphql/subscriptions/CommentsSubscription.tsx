import { useMemo } from 'react'

import { graphql, useSubscription } from 'react-relay'

import { getCommentsConnectionId } from '../../utils'

export const CommentsSubscriptionQuery = graphql`
  subscription CommentsSubscription($connections: [ID!]!, $targetObjectId: ID) {
    onCommentChange(targetObjectId: $targetObjectId) {
      createdComment @prependEdge(connections: $connections) {
        node {
          id
          ...CommentItem_comment

          target {
            commentsCount {
              total
              main
              replies
            }
          }
        }
      }
      updatedComment {
        ...CommentItem_comment
      }
      deletedCommentId @deleteRecord
    }
  }
`

export const useCommentChangeSubscription = (targetObjectId?: string) => {
  const config = useMemo(() => {
    const connections: string[] = []

    if (targetObjectId) {
      connections.push(getCommentsConnectionId(targetObjectId))
    }

    return {
      subscription: CommentsSubscriptionQuery,
      onError: console.error,
      variables: { connections, targetObjectId },
    }
  }, [targetObjectId])

  return useSubscription(config)
}

export const CommentsSubscription = ({ targetObjectId }: { targetObjectId?: string }) => {
  useCommentChangeSubscription(targetObjectId)
  return null
}
