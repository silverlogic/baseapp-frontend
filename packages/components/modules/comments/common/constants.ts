export const NUMBER_OF_COMMENTS_TO_LOAD_NEXT = 5

// Must match the @connection key and the orderBy default declared in the
// CommentsList_comments fragment (graphql/queries/CommentsList.ts).
export const COMMENTS_LIST_CONNECTION_KEY = 'CommentsList_comments'

export const DEFAULT_COMMENTS_ORDER_BY = '-is_pinned,-created'

export const DEFAULT_MAX_THREAD_DEPTH = 5

// One source for both platforms, so web and mobile refuse the same attachments.
export const COMMENT_FILE_ATTACHMENT_LIMITS = {
  maxFiles: 5,
  maxFileSize: 100 * 1024 * 1024, // 100MB
  acceptedFileTypes: {
    'image/*': ['.png', '.jpg'],
    'application/pdf': ['.pdf'],
  },
}
