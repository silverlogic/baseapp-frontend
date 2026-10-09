import { ConnectionHandler } from 'react-relay'

import { CommentItem_comment$data } from '../../../__generated__/CommentItem_comment.graphql'
import { COMMENTS_LIST_CONNECTION_KEY } from './constants'
import { CommentEditTarget } from './context/CommentReplyProvider/types'

let nextClientMutationId = 0

export const getNextClientMutationId = (): string => {
  nextClientMutationId += 1
  return nextClientMutationId.toString()
}

export const getCommentsConnectionId = (parentOrTargetId: string): string =>
  ConnectionHandler.getConnectionID(parentOrTargetId, COMMENTS_LIST_CONNECTION_KEY)

export const toCommentEditTarget = (
  comment: Pick<CommentItem_comment$data, 'id' | 'body' | 'mentions'>,
): CommentEditTarget => ({
  id: comment.id,
  body: comment.body,
  mentionedProfileIds:
    comment.mentions?.edges?.flatMap((edge) =>
      edge?.node?.profile?.id ? [edge.node.profile.id] : [],
    ) ?? [],
})
