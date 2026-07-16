import { ConnectionHandler } from 'react-relay'

import { COMMENTS_LIST_CONNECTION_KEY } from '../constants'
import { getCommentsConnectionId, getNextClientMutationId, toCommentEditTarget } from '../utils'

describe('getNextClientMutationId', () => {
  test('returns strictly increasing numeric strings', () => {
    const first = getNextClientMutationId()
    const second = getNextClientMutationId()

    expect(Number(second)).toBe(Number(first) + 1)
  })
})

describe('getCommentsConnectionId', () => {
  test('derives the CommentsList connection id for the given record', () => {
    expect(getCommentsConnectionId('someTargetId')).toBe(
      ConnectionHandler.getConnectionID('someTargetId', COMMENTS_LIST_CONNECTION_KEY),
    )
  })
})

describe('toCommentEditTarget', () => {
  test('extracts id, body, and mentioned profile ids', () => {
    const comment = {
      id: 'comment-1',
      body: 'hello @jane',
      mentions: {
        edges: [
          { node: { profile: { id: 'profile-1' } } },
          null,
          { node: null },
          { node: { profile: null } },
          { node: { profile: { id: 'profile-2' } } },
        ],
      },
    }

    expect(toCommentEditTarget(comment as never)).toEqual({
      id: 'comment-1',
      body: 'hello @jane',
      mentionedProfileIds: ['profile-1', 'profile-2'],
    })
  })

  test('defaults mentioned profile ids to an empty array', () => {
    expect(toCommentEditTarget({ id: 'comment-1', body: null, mentions: null } as never)).toEqual({
      id: 'comment-1',
      body: null,
      mentionedProfileIds: [],
    })
  })
})
