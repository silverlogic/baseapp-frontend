export const NUMBER_OF_COMMENTS_TO_LOAD_NEXT = 5

// Must match the @connection key and the orderBy default declared in the
// CommentsList_comments fragment (graphql/queries/CommentsList.ts).
export const COMMENTS_LIST_CONNECTION_KEY = 'CommentsList_comments'

export const DEFAULT_COMMENTS_ORDER_BY = '-is_pinned,-created'

export const DEFAULT_MAX_THREAD_DEPTH = 5
