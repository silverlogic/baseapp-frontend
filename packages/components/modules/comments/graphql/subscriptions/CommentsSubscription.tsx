import { useMemo } from 'react'

import { ConnectionHandler, graphql, useSubscription } from 'react-relay'

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
      connections.push(ConnectionHandler.getConnectionID(targetObjectId, 'CommentsList_comments'))
    }

    return {
      subscription: CommentsSubscriptionQuery,
      onError: console.error,
      variables: { connections, targetObjectId },
    }
  }, [targetObjectId])

  return useSubscription(config)
}

const CommentsSubscription = ({ targetObjectId }: { targetObjectId?: string }) => {
  useCommentChangeSubscription(targetObjectId)
  return null
}

export default CommentsSubscription
