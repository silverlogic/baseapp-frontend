import { FC } from 'react'

import CommentReplyProvider from '../CommentReplyProvider'

const withCommentReplyProvider =
  <TProps extends {}>(Component: FC<TProps>) =>
  (props: TProps) => (
    <CommentReplyProvider>
      <Component {...props} />
    </CommentReplyProvider>
  )

export default withCommentReplyProvider
