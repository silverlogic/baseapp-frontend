import { CommentComposerState, CommentReplyState } from './types'

export const INITIAL_COMMENT_REPLY_STATE: CommentReplyState = {
  commentItemRef: undefined,
  inReplyToId: undefined,
  name: undefined,
}

export const INITIAL_COMMENT_COMPOSER_STATE: CommentComposerState = {
  ...INITIAL_COMMENT_REPLY_STATE,
  editingComment: undefined,
  commentIdToExpand: undefined,
}
